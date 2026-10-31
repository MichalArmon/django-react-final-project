import { Box, Container, Pagination, Stack, Typography } from "@mui/material";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

import ArticleCard from "./ArticleCard";
import { useArticle } from "../../providers/ArticleProvider";

const MotionBox = motion.create(Box);

export default function ArticlesPage() {
  const { articles, handleGetAllArticles, totalArticles } = useArticle([]);

  const [page, setPage] = useState(1);
  const reduceMotion = useReducedMotion();

  const pageSize = 9;

  const handleOpenArticle = (article) => {
    console.log("Open article:", article);
  };

  useEffect(() => {
    handleGetAllArticles(page);
  }, [page]);

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        bgcolor: "#FAFAFC",
        pt: { xs: 5, md: 9 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 5 } }}>
        {/* PAGE HEADER */}
        <MotionBox
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          sx={{
            mb: { xs: 5, md: 7 },
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: {
                xs: "2.8rem",
                md: "4.3rem",
              },
              fontWeight: 800,
              letterSpacing: "-0.065em",
              lineHeight: 1.1,
              color: "#17182B",
              mb: 2,
            }}
          >
            Latest Articles
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 15, md: 17 },
              color: "#73758A",
              lineHeight: 1.8,
              maxWidth: 600,
            }}
          >
            Discover the latest stories, ideas, and perspectives from our
            community.
          </Typography>
        </MotionBox>

        {/* SECTION DIVIDER */}
        <Box
          sx={{
            height: "1px",
            bgcolor: "#E8E8EF",
            mb: { xs: 4, md: 5 },
          }}
        />

        {/* ARTICLE GRID */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              lg: "repeat(3, minmax(0, 1fr))",
            },
            gap: { xs: 3, md: 4 },
            alignItems: "stretch",
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

        {/* PAGINATION */}
        <Stack
          alignItems="center"
          sx={{
            mt: { xs: 6, md: 9 },
          }}
        >
          <Pagination
            count={Math.ceil(totalArticles / pageSize)}
            page={page}
            onChange={(_, value) => {
              setPage(value);
              window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth",
              });
            }}
            color="primary"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 600,
                borderRadius: 2,
              },
            }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
