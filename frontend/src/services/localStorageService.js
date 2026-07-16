import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN = "access token";
const REFRESH_TOKEN = "refresh token";
export const setAccessTokenInLocalStorage = (jwtToken) => {
  localStorage.setItem(ACCESS_TOKEN, jwtToken);
};

export const setRefreshTokenInLocalStorage = (jwtToken) => {
  localStorage.setItem(REFRESH_TOKEN, jwtToken);
};

export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};
export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};
export const getUser = () => {
  try {
    const myToken = getToken();
    console.log(jwtDecode(myToken));
    return jwtDecode(myToken);
  } catch (error) {
    return null;
  }
};
