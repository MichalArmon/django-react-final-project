import { createContext, useContext, useState } from "react";
import axios from "axios";
import { getToken } from "../services/localStorageService";

const ArticleContext = createContext();

export default function ArticleProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const token = getToken();

  // ✔️✔️✔️GET ALL ✔️✔️✔️
  async function handleGetAllArticles(page = 1) {
    try {
      const response = await axios.get("http://localhost:8000/api/articles/", {
        params: {
          page: page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.results);
      setArticles(response.data.results);
      setTotalArticles(response.data.count);
      return response.data.results;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
      }

      throw error;
    }
  }

  // ✔️✔️✔️Filtered articles ✔️✔️✔️
  async function handleGetFilteredArticles(value, page = 1) {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/articles?search=${value}`,
        {
          params: {
            page: page,
          },
        },
      );

      console.log(response.data.results);
      setArticles(response.data.results);
      setTotalArticles(response.data.count);
      return response.data.results;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status);
        console.error("Data:", error.response?.data);
      }

      throw error;
    }
  }
  // ✔️✔️✔️Create Article ✔️✔️✔️
  const handleSubmitCreateArticle = async (data) => {
    try {
      const response = await axios.post(`${URL}/articles/`, data);
      console.log(response);

      // setSnack("success", "Account created successfully!");
      // await handleSubmitLoginUser(userDetailsForServer);
    } catch (error) {
      // setSnack("error", error.response.data);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <ArticleContext.Provider
      value={{
        setArticles,
        articles,
        handleGetAllArticles,
        totalArticles,
        setTotalArticles,
        handleGetFilteredArticles,
        filteredArticles,
        setFilteredArticles,
        handleSubmitCreateArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}

export const useArticle = () => {
  const context = useContext(ArticleContext);
  if (!context) throw Error("useArticles must be used within a NameProvider");
  return context;
};
