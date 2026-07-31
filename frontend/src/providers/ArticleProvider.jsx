import { createContext, useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/apiService";
import ArticleToServer from "../normalization/articleForServer";

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
          page,
        },
      });

      const articleResults = response.data.results || response.data;

      setArticles(articleResults);
      setTotalArticles(response.data.count || articleResults.length);

      return articleResults;
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
          page,
        },
      });

      const articleResults = response.data.results || response.data;

      setArticles(articleResults);
      setFilteredArticles(articleResults);
      setTotalArticles(response.data.count || articleResults.length);

      return articleResults;
    } catch (error) {
      console.error(
        "Get filtered articles failed:",
        error.response?.data || error.message,
      );

      throw error;
    }
  }

  // ✔️✔️✔️ GET MY ARTICLES ✔️✔️✔️
  async function handleGetMyArticles(authorId, page = 1) {
    try {
      const response = await api.get(URL, {
        params: {
          author: authorId,
          page,
        },
      });

      const articleResults = response.data.results || response.data;

      setMyArticles(articleResults);
      setTotalArticles(response.data.count || articleResults.length);

      return articleResults;
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
    const articleForServer = ArticleToServer(data);

    console.log("Article for server:", articleForServer);

    try {
      const response = await api.post(URL, articleForServer);

      console.log("Created article:", response.data);

      setMyArticles((prev) => [...prev, response.data]);

      setArticles((prev) => [response.data, ...prev]);

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
    const articleForServer = ArticleToServer(articleData);

    console.log("Edited article for server:", articleForServer);

    try {
      const response = await api.put(`${URL}${articleId}/`, articleForServer);

      setArticle(response.data);

      setArticles((prev) =>
        prev.map((currentArticle) =>
          currentArticle.id === Number(articleId)
            ? response.data
            : currentArticle,
        ),
      );

      setMyArticles((prev) =>
        prev.map((currentArticle) =>
          currentArticle.id === Number(articleId)
            ? response.data
            : currentArticle,
        ),
      );

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
        prev.filter(
          (currentArticle) => currentArticle.id !== Number(articleId),
        ),
      );

      setMyArticles((prev) =>
        prev.filter(
          (currentArticle) => currentArticle.id !== Number(articleId),
        ),
      );

      setSnack("success", "Article deleted successfully");
    } catch (error) {
      console.error(
        "Delete article failed:",
        error.response?.data || error.message,
      );

      setSnack("error", "The article could not be deleted");

      throw error;
    }
  }

  // ✔️✔️✔️ LIKE ARTICLE ✔️✔️✔️
  async function handleLikeArticle(articleId) {
    try {
      const response = await api.patch(`${URL}${articleId}/like/`);

      const updateArticleLike = (currentArticle) => {
        if (currentArticle.id !== Number(articleId)) {
          return currentArticle;
        }

        return {
          ...currentArticle,
          likes: response.data.likes,
          is_liked: response.data.liked,
        };
      };

      setArticles((prev) => prev.map(updateArticleLike));

      setMyArticles((prev) => prev.map(updateArticleLike));

      setArticle((prev) =>
        prev?.id === Number(articleId)
          ? {
              ...prev,
              likes: response.data.likes,
              is_liked: response.data.liked,
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
        articles,
        setArticles,

        article,
        setArticle,

        filteredArticles,
        setFilteredArticles,

        myArticles,

        totalArticles,
        setTotalArticles,

        handleGetAllArticles,
        handleGetFilteredArticles,
        handleGetMyArticles,
        handleSubmitCreateArticle,
        handleGetOneArticle,
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
    throw new Error("useArticle must be used within an ArticleProvider");
  }

  return context;
};
