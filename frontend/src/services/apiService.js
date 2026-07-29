import axios from "axios";
import {
  getToken,
  getRefreshToken,
  setAccessTokenInLocalStorage,
  removeTokens,
} from "./localStorageService";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
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
        return Promise.reject(error);
      }

      const response = await axios.post(
        "http://localhost:8000/api/users/token/refresh/",
        {
          refresh: refreshToken,
        },
      );

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
