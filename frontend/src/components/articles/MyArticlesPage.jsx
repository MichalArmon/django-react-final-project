import {
  Box,
  Container,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArticleCard from "./ArticleCard";
import { useState, useEffect } from "react";

import { useArticle } from "../../providers/ArticleProvider";
import { getUser } from "../../services/localStorageService";

export default function MyArticlesPage() {
  const {
    articles,
    setArticles,
    handleGetAllArticles,
    totalArticles,
    setTotalArticles,
    handleGetFilteredArticles,
    handleGetMyArticles,
    myArticles,
  } = useArticle([]);
  const [page, setPage] = useState(1);
  const user = getUser();

  const pageSize = 9;
  const handleOpenArticle = (article) => {
    console.log("Open article:", article);
  };

  useEffect(() => {
    handleGetMyArticles(user.user_id, page);
  }, [page]);

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
          My Articles
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
          {myArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onOpen={handleOpenArticle}
            />
          ))}
        </Box>
        <Stack alignItems="center" sx={{ mt: 4 }}>
          <Pagination
            count={Math.ceil(totalArticles / pageSize)}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Stack>
      </Container>
    </Box>
  );
}
