import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/apiService";

const ArticleContext = createContext();

export default function ArticleProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({});
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [myArticles, setMyArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);

  const URL = "articles/";
  const navigate = useNavigate();

  // ✔️✔️✔️ GET ALL ✔️✔️✔️
  async function handleGetAllArticles(page = 1) {
    try {
      const response = await api.get(URL, {
        params: {
          page: page,
        },
      });

      console.log(response.data.results);

      setArticles(response.data.results);
      setTotalArticles(response.data.count);

      return response.data.results;
    } catch (error) {
      console.log(
        "Get all articles failed:",
        error.response?.data || error.message,
      );

      throw error;
    }
  }

  // ✔️✔️✔️ FILTERED ARTICLES ✔️✔️✔️
  async function handleGetFilteredArticles(value, page = 1) {
    try {
      const response = await api.get(URL, {
        params: {
          search: value,
          page: page,
        },
      });

      console.log(response.data.results);

      setArticles(response.data.results);
      setTotalArticles(response.data.count);

      return response.data.results;
    } catch (error) {
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);

      throw error;
    }
  }

  // ✔️✔️✔️ GET MY ARTICLES ✔️✔️✔️
  async function handleGetMyArticles(authorId, page = 1) {
    try {
      const response = await api.get(URL, {
        params: {
          author: authorId,
          page: page,
        },
      });

      console.log(response.data.results);

      setMyArticles(response.data.results);
      setTotalArticles(response.data.count);

      return response.data.results;
    } catch (error) {
      console.log(
        "Get my articles failed:",
        error.response?.data || error.message,
      );

      throw error;
    }
  }

  // ✔️✔️✔️ CREATE ARTICLE ✔️✔️✔️
  const handleSubmitCreateArticle = async (data) => {
    try {
      const response = await api.post(URL, data);

      console.log(response.data);

      setMyArticles((prev) => [...prev, response.data]);

      navigate(-1);

      return response.data;
    } catch (error) {
      console.log(
        "Create article failed:",
        error.response?.data || error.message,
      );

      throw error;
    }
  };

  // ✔️✔️✔️ GET ONE ARTICLE ✔️✔️✔️
  const handleGetOneArticle = async (id) => {
    try {
      const response = await api.get(`${URL}${id}/`);

      setArticle(response.data);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log("Get article failed:", error.response?.data || error.message);

      throw error;
    }
  };

  // ✔️✔️✔️ EDIT ARTICLE ✔️✔️✔️
  const handleEditArticle = async (articleId, articleData) => {
    try {
      const response = await api.put(`${URL}${articleId}/`, articleData);

      setArticle(response.data);

      console.log(response.data);
      navigate(-1);

      return response.data;
    } catch (error) {
      console.log(
        "Edit article failed:",
        error.response?.data || error.message,
      );

      throw error;
    }
  };

  // ✔️✔️✔️ DELETE ARTICLE ✔️✔️✔️
  async function handleDeleteArticle(articleId) {
    try {
      await api.delete(`${URL}${articleId}/`);

      setArticles((prev) =>
        prev.filter((article) => article.id !== Number(articleId)),
      );

      setMyArticles((prev) =>
        prev.filter((article) => article.id !== Number(articleId)),
      );
    } catch (error) {
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);

      throw error;
    }
  }

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
        handleDeleteArticle,
      }}
    >
      {children}
    </ArticleContext.Provider>
  );
}

export const useArticle = () => {
  const context = useContext(ArticleContext);

  if (!context) {
    throw Error("useArticle must be used within an ArticleProvider");
  }

  return context;
};
