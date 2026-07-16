import { createContext, useContext, useState } from "react";
import axios from "axios";
import userToServer from "../normalization/userForServer";
import loginUserToServer from "../normalization/loginForServer";

import {
  getUser,
  getRefreshToken,
  setAccessTokenInLocalStorage,
  setRefreshTokenInLocalStorage,
  removeTokens,
} from "../services/localStorageService";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() => getUser());
  const URL = "http://localhost:8000/api";
  const navigate = useNavigate("");

  // ✔️✔️✔️register User ✔️✔️✔️

  const handleSubmitCreateUser = async (data) => {
    const userDetailsForServer = userToServer(data);

    try {
      const response = await axios.post(`${URL}/users/`, userDetailsForServer);
      console.log(response);
      data = {
        email: userDetailsForServer.email,
        password: userDetailsForServer.password,
      };
      await handleSubmitLoginUser(data);

      // setSnack("success", "Account created successfully!");
      // await handleSubmitLoginUser(userDetailsForServer);
    } catch (error) {
      // setSnack("error", error.response.data);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  // ✔️✔️✔️LOGIN ✔️✔️✔️
  const handleSubmitLoginUser = async (data) => {
    const loginUserDetailsForServer = loginUserToServer(data);
    console.log("loginUserDetailsForServer:", loginUserDetailsForServer);
    try {
      const response = await axios.post(
        `${URL}/users/login/`,
        loginUserDetailsForServer,
      );
      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;
      setAccessTokenInLocalStorage(accessToken);
      setRefreshTokenInLocalStorage(refreshToken);
      const user = getUser(response.data);
      console.log(user);
      // setOpenLogin(false);
      setUser(user);
      navigate("/");
      // handleGetUserFavorites();
      // setSnack("success", "You are Logged in successfully!");
    } catch (error) {
      // setSnack("error", error.response.data.message);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  // ✔️✔️✔️Refresh Token ✔️✔️✔️

  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      return null;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/token/refresh/",
        {
          refresh: refreshToken,
        },
      );

      const newAccessToken = response.data.access;

      setAccessTokenInLocalStorage(newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.error("Refresh token failed:", error.response?.data || error);

      removeTokens();

      return null;
    }
  };

  return (
    <UserContext.Provider
      value={{
        handleSubmitCreateUser,
        handleSubmitLoginUser,
        user,
        setUser,
        refreshAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw Error("useSnackbar must be used within a NameProvider");
  return context;
};
