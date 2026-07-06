import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✔️✔️✔️register User ✔️✔️✔️

  const handleSubmitCreateUser = async (data) => {
    const userDetailsForServer = normalizeRegisterDetails(data);

    try {
      const response = await axios.post(`${URL}/users`, userDetailsForServer);
      console.log(response);
      getUsersFromServer();
      setOpenSignup(false);
      setSnack("success", "Account created successfully!");
      await handleSubmitLoginUser(userDetailsForServer);
    } catch (error) {
      setSnack("error", error.response.data);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return {};
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw Error("useSnackbar must be used within a NameProvider");
  return context;
};
