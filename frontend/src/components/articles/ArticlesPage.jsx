import { Box, Container, Typography } from "@mui/material";
import ArticleCard from "./ArticleCard";
import { useState, useEffect } from "react";

import axios from "axios";

async function fetchArticles() {
  try {
    const response = await axios.get("http://localhost:8000/api/articles/");

    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);
    }

    throw error;
  }
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const handleOpenArticle = (article) => {
    console.log("Open article:", article);
  };

  useEffect(() => {
    async function loadArticles() {
      const data = await fetchArticles();
      setArticles(data);
    }
    loadArticles();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",

        py: { xs: 4, md: 7 },
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: "text.primary",
          }}
        >
          Latest Articles
        </Typography>

        <Typography
          sx={{
            color: "text.secondary",
            mb: 4,
          }}
        >
          Discover the newest stories, insights and updates.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: 3,
          }}
        >
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpen={handleOpenArticle}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
