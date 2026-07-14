import { createContext, useContext, useState } from "react";
import axios from "axios";

const ArticleContext = createContext();

export default function ArticleProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);

  // ✔️✔️✔️GET ALL ✔️✔️✔️
  async function handleGetAllArticles(page = 1) {
    try {
      const response = await axios.get("http://localhost:8000/api/articles/", {
        params: {
          page: page,
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

  return (
    <ArticleContext.Provider
      value={{
        setArticles,
        articles,
        handleGetAllArticles,
        totalArticles,
        setTotalArticles,
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
