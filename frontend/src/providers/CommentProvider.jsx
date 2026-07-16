import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import commentForServer from "../normalization/commentForServer";

const CommentContext = createContext();

export default function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);

  const [currentComments, setCurrentComments] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setComments(comments);
  }, [comments]);

  // ✔️✔️✔️CREATE ✔️✔️✔️

  async function handleAddComment(commentData) {
    const commentToServer = commentForServer(commentData);

    const content = commentToServer.content?.trim();

    if (!content || isSending) return;

    try {
      setIsSending(true);
      setError("");

      const token = localStorage.getItem("access token");

      const response = await axios.post(
        "http://localhost:8000/api/comments/",
        commentToServer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setComments((prev) => [...prev, response.data]);

      return response.data;
    } catch (error) {
      console.error(error.response?.data || error);

      setError(
        error.response?.data?.detail || "The comment could not be added.",
      );
    } finally {
      setIsSending(false);
    }
  }

  // ✔️✔️✔️GET by Article ✔️✔️✔️

  async function handleGetByArticle(articleId) {
    try {
      const token = localStorage.getItem("access token");

      const response = await axios.get(
        `http://localhost:8000/api/comments/search=${articleId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setComments((prev) => [...prev, response.data]);

      return response.data;
    } catch (error) {
      console.error(error.response?.data || error);

      setError(
        error.response?.data?.detail || "The comment could not be added.",
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <CommentContext.Provider
      value={{
        comments,
        setComments,

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
  if (!context) throw Error("useComments must be used within a NameProvider");
  return context;
};
