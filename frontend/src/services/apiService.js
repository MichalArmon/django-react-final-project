import axios from "axios";

import {
  getToken,
  getRefreshToken,
  setAccessTokenInLocalStorage,
  removeTokens,
} from "./localStorageService";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: `${API_URL}/`,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error.response?.status === 401;

    const wasAlreadyRetried = originalRequest?._retry;

    if (!isUnauthorized || wasAlreadyRetried) {
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

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      removeTokens();

      return Promise.reject(refreshError);
    }
  },
);

export default api;
