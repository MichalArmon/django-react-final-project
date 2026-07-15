import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import commentForServer from "../normalization/commentForServer";

const CommentContext = createContext();

export default function CommentProvider({ children }) {
  const [comments, setComments] = useState([]);
  const [currentComments, setCurrentComments] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setCurrentComments(comments);
  }, [comments]);

  // ✔️✔️✔️CREATE ✔️✔️✔️

  async function handleAddComment(e, commentData) {
    e.preventDefault();
    const commentForServer = commentForServer(commentData);

    const content = newComment.trim();

    if (!content || isSending) return;

    try {
      setIsSending(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/comments/",
        commentData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCurrentComments((prev) => [...prev, response.data]);
      setNewComment("");
    } catch (error) {
      console.error(error);

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
        currentComments,
        setCurrentComments,
        isSending,
        setIsSending,
        error,
        setError,
        handleAddComment,
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
