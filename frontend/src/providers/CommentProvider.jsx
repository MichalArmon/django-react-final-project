import { createContext, useContext, useState } from "react";

import api from "../services/apiService";
import commentForServer from "../normalization/commentForServer";

const CommentContext = createContext();

export default function CommentProvider({ children }) {
  const [currentComments, setCurrentComments] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  // ✔️✔️✔️ CREATE ✔️✔️✔️
  async function handleAddComment(commentData) {
    const commentToServer = commentForServer(commentData);
    const content = commentToServer.content?.trim();

    if (!content || isSending) return;

    try {
      setIsSending(true);
      setError("");

      const response = await api.post("comments/", commentToServer);

      return response.data;
    } catch (error) {
      console.error(
        "Add comment failed:",
        error.response?.data || error.message,
      );

      setError(
        error.response?.data?.detail || "The comment could not be added.",
      );

      throw error;
    } finally {
      setIsSending(false);
    }
  }

  // ✔️✔️✔️ GET BY ARTICLE ✔️✔️✔️
  async function handleGetByArticle(articleId) {
    try {
      setError("");

      const response = await api.get("comments/", {
        params: {
          article: articleId,
        },
      });

      setCurrentComments(response.data.results);

      return response.data;
    } catch (error) {
      console.error(
        "Get comments failed:",
        error.response?.data || error.message,
      );

      setError(
        error.response?.data?.detail || "The comments could not be loaded.",
      );

      throw error;
    }
  }

  return (
    <CommentContext.Provider
      value={{
        isSending,
        setIsSending,
        error,
        setError,
        handleAddComment,
        currentComments,
        setCurrentComments,
        handleGetByArticle,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
}

export const useComment = () => {
  const context = useContext(CommentContext);

  if (!context) {
    throw Error("useComment must be used within a CommentProvider");
  }

  return context;
};
