import { Favorite, FavoriteBorder } from "@mui/icons-material";

import { Box, Container, Grid, Paper, Typography } from "@mui/material";

import { useEffect } from "react";

import { useArticle } from "../providers/ArticleProvider";
import ArticleCard from "../components/articles/ArticleCard";

function FavoritesPage() {
  const { favoriteArticles, setFavoriteArticles, handleGetFavoriteArticles } =
    useArticle();

  useEffect(() => {
    handleGetFavoriteArticles();
  }, []);

  const handleFavoriteChange = (articleId, isLiked) => {
    if (!isLiked) {
      setFavoriteArticles((currentFavoriteArticles) =>
        currentFavoriteArticles.filter((article) => article.id !== articleId),
      );
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: {
          xs: 3,
          md: 6,
        },
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            p: {
              xs: 3,
              md: 5,
            },
            position: "relative",
            overflow: "hidden",
            borderRadius: 4,
            color: "white",
            background:
              "linear-gradient(135deg, #482280 0%, #6D3FC0 58%, #F28C28 100%)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 180,
              height: 180,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.08)",
              top: -80,
              right: -60,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              textAlign: "center",
            }}
          >
            <Favorite
              sx={{
                mb: 2,
                fontSize: 46,
              }}
            />

            <Typography
              component="h1"
              sx={{
                fontSize: {
                  xs: "2rem",
                  md: "3rem",
                },
                fontWeight: 900,
              }}
            >
              Favorite Articles
            </Typography>

            <Typography
              sx={{
                mt: 1,
                maxWidth: 650,
                mx: "auto",
                color: "rgba(255,255,255,0.88)",
                lineHeight: 1.8,
              }}
            >
              All the articles you liked, collected in one place.
            </Typography>
          </Box>
        </Paper>

        {favoriteArticles.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              minHeight: 320,
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 4,
            }}
          >
            <FavoriteBorder
              sx={{
                mb: 2,
                fontSize: 64,
                color: "secondary.main",
              }}
            />

            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
              }}
            >
              No favorite articles yet
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 1,
                maxWidth: 450,
                lineHeight: 1.8,
              }}
            >
              Press the heart icon on an article and it will appear here.
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {favoriteArticles.map((article) => (
              <Grid item xs={12} sm={6} md={4} key={article.id}>
                <ArticleCard
                  article={article}
                  onLikeChange={handleFavoriteChange}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default FavoritesPage;
