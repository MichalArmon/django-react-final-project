import { createContext, useContext, useState } from "react";
import axios from "axios";
import { getToken } from "../services/localStorageService";
import { useUser } from "./UserProvider";
import { useNavigate } from "react-router-dom";

const ArticleContext = createContext();

export default function ArticleProvider({ children }) {
  const { refreshAccessToken } = useUser();
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({});
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [myArticles, setMyArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  const token = getToken();
  const URL = "http://localhost:8000/api/articles/";
  const navigate = useNavigate("");

  // ✔️✔️✔️GET ALL ✔️✔️✔️
  async function handleGetAllArticles(page = 1) {
    try {
      const response = await axios.get(URL, {
        params: {
          page: page,
        },
      });

      console.log(response.data.results);

      setArticles(response.data.results);
      setTotalArticles(response.data.count);

      return response.data.results;
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const newToken = await refreshAccessToken();

          const response = await axios.get(URL, {
            params: {
              page: page,
            },
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });

          setArticles(response.data.results);
          setTotalArticles(response.data.count);

          return response.data.results;
        } catch (refreshError) {
          console.log("Refresh or retry failed:", refreshError.response?.data);
        }
      } else {
        console.log(error.response?.data);
      }
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

  // ✔️✔️✔️Get My articles ✔️✔️✔️
  async function handleGetMyArticles(authorId, page = 1) {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/articles?author=${authorId}`,
        {
          params: {
            page: page,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data.results);
      setMyArticles(response.data.results);
      setTotalArticles(response.data.count);
      return response.data.results;
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const newToken = await refreshAccessToken();

          const response = await axios.post(URL, data, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });

          console.log(response.data);
        } catch (refreshError) {
          console.log("Refresh failed:", refreshError.response?.data);
        }
      } else {
        console.log(error.response?.data);
      }
    }
  }
  // ✔️✔️✔️Create Article ✔️✔️✔️
  const handleSubmitCreateArticle = async (data) => {
    try {
      const response = await axios.post(URL, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      setMyArticles((prev) => [...prev, response.data]);
      navigate(-1);
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const newToken = await refreshAccessToken();

          const response = await axios.post(URL, data, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });

          console.log(response.data);
        } catch (refreshError) {
          console.log("Refresh failed:", refreshError.response?.data);
        }
      } else {
        console.log(error.response?.data);
      }
    }
  };

  // ✔️✔️✔️Get one Article ✔️✔️✔️
  const handleGetOneArticle = async (id) => {
    try {
      const response = await axios.get(`${URL}${id}/`);
      setArticle(response.data);

      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  // ✔️✔️✔️Edit Article ✔️✔️✔️
  const handleEditArticle = async (articleId, articleData) => {
    try {
      const response = await axios.put(`${URL}${articleId}/`, articleData, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setArticle(response.data);

      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        try {
          const newToken = await refreshAccessToken();

          const response = await axios.put(`${URL}${articleId}/`, articleData, {
            headers: {
              Authorization: `Bearer ${newToken}`,
            },
          });

          console.log(response.data);
        } catch (refreshError) {
          console.log("Refresh failed:", refreshError.response?.data);
        }
      } else {
        console.log(error.response?.data);
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
        handleGetMyArticles,
        myArticles,
        handleGetOneArticle,
        article,
        setArticle,
        handleEditArticle,
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
