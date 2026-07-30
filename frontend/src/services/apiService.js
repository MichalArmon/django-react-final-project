import axios from "axios";

import {
  getToken,
  getRefreshToken,
  setAccessTokenInLocalStorage,
  removeTokens,
} from "./localStorageService";

import {
  hideGlobalLoader,
  showGlobalLoader,
} from "../providers/LoadingProvider";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: `${API_URL}/`,
});

/* --------------------------------
   REQUEST INTERCEPTOR
-------------------------------- */
api.interceptors.request.use(
  (config) => {
    showGlobalLoader();

    const accessToken = getToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => {
    hideGlobalLoader();

    return Promise.reject(error);
  },
);

/* --------------------------------
   RESPONSE INTERCEPTOR
-------------------------------- */
api.interceptors.response.use(
  (response) => {
    hideGlobalLoader();

    return response;
  },

  async (error) => {
    hideGlobalLoader();

    const originalRequest = error.config;
    const isUnauthorized = error.response?.status === 401;
    const wasAlreadyRetried = originalRequest?._retry;

    if (!originalRequest || !isUnauthorized || wasAlreadyRetried) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        removeTokens();

        return Promise.reject(error);
      }

      const response = await axios.post(`${API_URL}/users/token/refresh/`, {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;

      setAccessTokenInLocalStorage(newAccessToken);

      originalRequest.headers = originalRequest.headers || {};

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      removeTokens();

      return Promise.reject(refreshError);
    }
  },
);

export default api;
