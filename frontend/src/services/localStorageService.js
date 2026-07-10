import { jwtDecode } from "jwt-decode";

const TOKEN = "my token";
export const setTokenInLocalStorage = (jwtToken) => {
  localStorage.setItem(TOKEN, jwtToken);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN);
};
export const removeToken = () => {
  localStorage.removeItem(TOKEN);
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
