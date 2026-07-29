import { createContext, useContext, useState } from "react";
import axios from "axios";
import userToServer from "../normalization/userForServer";
import loginUserToServer from "../normalization/loginForServer";

import {
  getUser,
  setAccessTokenInLocalStorage,
  setRefreshTokenInLocalStorage,
} from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import { useSnack } from "./SnackBarProvider";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(() => getUser());

  const URL = "http://localhost:8000/api";
  const navigate = useNavigate("");
  const { setSnack } = useSnack();

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
      setSnack("success", "Account created successfully");
      await handleSubmitLoginUser(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
      setSnack("error", "The account could not be created");
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

      setUser(user);
      navigate("/");

      setSnack("success", "You are Logged in successfully!");
    } catch (error) {
      setSnack("error", error.response.data.message);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        handleSubmitCreateUser,
        handleSubmitLoginUser,
        user,
        setUser,
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
