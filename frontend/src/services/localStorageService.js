import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN = "access token";
const REFRESH_TOKEN = "refresh token";

export const setAccessTokenInLocalStorage = (token) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

export const setRefreshTokenInLocalStorage = (token) => {
  localStorage.setItem(REFRESH_TOKEN, token);
};

export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

export const getUser = () => {
  const token = getToken();

  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid access token:", error);
    return null;
  }
};

export const getTokenExpiration = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) return null;

    return new Date(decoded.exp * 1000);
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);

    if (!decoded.exp) return true;

    return decoded.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};
