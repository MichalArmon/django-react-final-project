import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/apiService";
import { useSnack } from "./SnackBarProvider";

const ArticleContext = createContext();

export default function ArticleProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({});
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [myArticles, setMyArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);

  const URL = "articles/";
  const navigate = useNavigate();
  const { setSnack } = useSnack();

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
      setSnack("success", "Article created successfully");

      navigate(-1);

      return response.data;
    } catch (error) {
      console.log(
        "Create article failed:",
        error.response?.data || error.message,
      );
      setSnack("error", "The article could not be created");

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
      setSnack("success", "Article updated successfully");
      navigate(-1);

      return response.data;
    } catch (error) {
      console.log(
        "Edit article failed:",
        error.response?.data || error.message,
      );
      setSnack("error", "The article could not be updated");

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
      setSnack("success", "Article deleted successfully");
    } catch (error) {
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);
      setSnack("error", "The article could not be deleted");

      throw error;
    }
  }

  // ✔️✔️✔️ LIKE ARTICLE ✔️✔️✔️
  async function handleLikeArticle(articleId) {
    try {
      const response = await api.patch(`articles/${articleId}/like/`);

      setArticles((prev) =>
        prev.map((article) =>
          article.id === Number(articleId)
            ? {
                ...article,
                likes: response.data.likes,
              }
            : article,
        ),
      );

      setMyArticles((prev) =>
        prev.map((article) =>
          article.id === Number(articleId)
            ? {
                ...article,
                likes: response.data.likes,
              }
            : article,
        ),
      );

      setArticle((prev) =>
        prev?.id === Number(articleId)
          ? {
              ...prev,
              likes: response.data.likes,
            }
          : prev,
      );

      return response.data;
    } catch (error) {
      console.error(
        "Like article failed:",
        error.response?.data || error.message,
      );

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
        handleLikeArticle,
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
