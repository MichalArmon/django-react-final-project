import { createContext, useContext, useState } from "react";
import axios from "axios";
import userToServer from "../normalization/userForServer";
import loginUserToServer from "../normalization/loginForServer";

import {
  getUser,
  setAccessTokenInLocalStorage,
  setRefreshTokenInLocalStorage,
  removeTokens,
} from "../services/localStorageService";
import { useNavigate } from "react-router-dom";
import { useSnack } from "./SnackBarProvider";
import api from "../services/apiService";

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
  // ✔️✔️✔️ LOGOUT ✔️✔️✔️
  const handleLogOutUser = () => {
    removeTokens();
    setUser(null);
    navigate("/");
  };

  // ✔️✔️✔️ GET ONE USER ✔️✔️✔️
  const handleGetOneUser = async (userId) => {
    try {
      const response = await api.get(`/users/${userId}/`);

      return response.data;
    } catch (error) {
      console.log("Get user error:", error.response?.data || error.message);

      setSnack("error", "The user could not be loaded");
      throw error;
    }
  };

  // ✔️✔️✔️ EDIT USER ✔️✔️✔️
  const handleEditUser = async (userId, userData) => {
    const userDetailsForServer = {
      username: userData.username,
      email: userData.email,
      first_name: userData.firstName,
      last_name: userData.lastName,
      profile: {
        bio: userData.bio,
        city: userData.city,
        age: Number(userData.age),
        experience_years: Number(userData.experience_years),
        role: userData.role,
      },
    };

    try {
      const response = await api.patch(
        `/users/${userId}/`,
        userDetailsForServer,
      );

      setSnack("success", "User updated successfully");

      return response.data;
    } catch (error) {
      console.log("Edit user error:", error.response?.data || error.message);

      setSnack("error", "The user could not be updated");
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        handleGetOneUser,
        handleEditUser,
        handleSubmitCreateUser,
        handleSubmitLoginUser,
        user,
        setUser,
        handleLogOutUser,
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
