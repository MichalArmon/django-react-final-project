import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  AccessTimeRounded,
  ArrowBackRounded,
  BoltRounded,
  EditRounded,
  FavoriteBorderRounded,
  FavoriteRounded,
  VisibilityOutlined,
} from "@mui/icons-material";

import { useUser } from "../../providers/UserProvider";
import { useArticle } from "../../providers/ArticleProvider";

function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  const dateFormatter = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedDate = dateFormatter.format(date);

  return formattedDate;
}

function calculateReadingTime(wordCount = 0) {
  const wordsPerMinute = 200;

  const exactReadingTime = wordCount / wordsPerMinute;

  const roundedReadingTime = Math.ceil(exactReadingTime);

  const minimumReadingTime = Math.max(1, roundedReadingTime);

  return minimumReadingTime;
}

function formatNumber(value = 0) {
  if (value >= 1000) {
    const formatter = new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    });

    return formatter.format(value);
  }

  return value.toString();
}

export default function ArticlePage() {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const { article, setArticle, handleGetOneArticle, handleLikeArticle } =
    useArticle();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLiking, setIsLiking] = useState(false);

  const loadedArticleId = useRef(null);

  useEffect(() => {
    if (loadedArticleId.current === articleId) return;

    loadedArticleId.current = articleId;
    handleGetOneArticle(articleId);
  }, [articleId]);

  const handleLike = async () => {
    if (!user || isLiking) return;

    try {
      setIsLiking(true);

      const result = await handleLikeArticle(articleId);

      setArticle((prev) => ({
        ...prev,
        likes: result.likes,
        is_liked: result.liked,
      }));
    } catch (error) {
      console.error("Like failed:", error);
    } finally {
      setIsLiking(false);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5" fontWeight={700}>
          {error || "Article not found"}
        </Typography>

        <Button
          startIcon={<ArrowBackRounded />}
          onClick={() => navigate("/articles")}
          sx={{ mt: 3 }}
        >
          Back to articles
        </Button>
      </Container>
    );
  }

  const {
    id,
    title,
    content,
    author,
    author_username,
    published_at,
    views = 0,
    likes = 0,
    word_count = 0,
    tags = [],
    is_breaking_news = false,
    is_liked = false,
  } = article;

  const isArticleOwner =
    author != null &&
    user?.user_id != null &&
    Number(author) === Number(user.user_id);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: {
          xs: 4,
          md: 8,
        },
        background:
          "linear-gradient(180deg, rgba(186,104,200,0.08) 0%, rgba(255,255,255,1) 38%)",
      }}
    >
      <Container maxWidth="md">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Button
            startIcon={<ArrowBackRounded />}
            onClick={() => navigate(-1)}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Back
          </Button>

          {isArticleOwner && (
            <Button
              variant="outlined"
              startIcon={<EditRounded />}
              onClick={() => navigate(`/articles/${id}/edit`)}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              Edit article
            </Button>
          )}
        </Stack>

        <Paper
          elevation={0}
          sx={{
            overflow: "hidden",
            borderRadius: {
              xs: 3,
              md: 5,
            },
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
            boxShadow: "0 24px 70px rgba(47, 10, 69, 0.10)",
          }}
        >
          <Box
            sx={{
              height: 10,
              background: is_breaking_news
                ? "linear-gradient(90deg, #ff3d71, #ff8a00)"
                : "linear-gradient(90deg, #2f0a45, #ba68c8)",
            }}
          />

          <Box
            component="article"
            sx={{
              px: {
                xs: 3,
                sm: 5,
                md: 8,
              },
              py: {
                xs: 4,
                md: 7,
              },
            }}
          >
            {is_breaking_news && (
              <Chip
                icon={<BoltRounded />}
                label="Breaking news"
                sx={{
                  mb: 3,
                  fontWeight: 700,
                  color: "#b42318",
                  backgroundColor: "#fff1f0",
                  border: "1px solid #ffccc7",
                }}
              />
            )}

            <Typography
              component="h1"
              sx={{
                maxWidth: 760,
                fontSize: {
                  xs: "2rem",
                  sm: "2.7rem",
                  md: "3.5rem",
                },
                fontWeight: 800,
                lineHeight: 1.12,
                letterSpacing: "-0.035em",
                color: "text.primary",
              }}
            >
              {title}
            </Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              justifyContent="space-between"
              alignItems={{
                xs: "flex-start",
                sm: "center",
              }}
              spacing={3}
              sx={{ mt: 4 }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: "primary.main",
                    fontWeight: 800,
                  }}
                >
                  {author_username?.charAt(0)?.toUpperCase() || "A"}
                </Avatar>

                <Box>
                  <Typography fontWeight={800}>
                    {author_username || "Unknown author"}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Published {formatDate(published_at)}
                  </Typography>
                </Box>
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                flexWrap="wrap"
                useFlexGap
              >
                <Tooltip title="Views">
                  <Chip
                    icon={<VisibilityOutlined />}
                    label={formatNumber(views)}
                    variant="outlined"
                  />
                </Tooltip>

                <Tooltip
                  title={
                    !user
                      ? "Login to like"
                      : is_liked
                        ? "Unlike article"
                        : "Like article"
                  }
                >
                  <Chip
                    clickable={Boolean(user)}
                    disabled={isLiking}
                    onClick={user ? handleLike : undefined}
                    icon={
                      is_liked ? <FavoriteRounded /> : <FavoriteBorderRounded />
                    }
                    label={formatNumber(likes)}
                    variant={is_liked ? "filled" : "outlined"}
                    sx={{
                      cursor: user ? "pointer" : "default",

                      "& .MuiChip-icon": {
                        color: is_liked ? "error.main" : "inherit",
                      },
                    }}
                  />
                </Tooltip>

                <Tooltip title="Reading time">
                  <Chip
                    icon={<AccessTimeRounded />}
                    label={`${calculateReadingTime(word_count)} min read`}
                    variant="outlined"
                  />
                </Tooltip>
              </Stack>
            </Stack>

            {tags.length > 0 && (
              <Stack
                direction="row"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
                sx={{ mt: 4 }}
              >
                {tags.map((tag) => (
                  <Chip
                    key={tag.id}
                    label={tag.name}
                    size="small"
                    sx={{
                      borderRadius: 2,
                      fontWeight: 700,
                      color: "primary.main",
                      backgroundColor: "rgba(186, 104, 200, 0.12)",
                    }}
                  />
                ))}
              </Stack>
            )}

            <Divider sx={{ my: 5 }} />

            <Typography
              component="div"
              sx={{
                fontSize: {
                  xs: "1.05rem",
                  md: "1.15rem",
                },
                lineHeight: 1.95,
                color: "text.primary",
                whiteSpace: "pre-line",

                "&::first-letter": {
                  fontSize: {
                    xs: "3rem",
                    md: "4rem",
                  },
                  fontWeight: 800,
                  float: "left",
                  lineHeight: 0.8,
                  pr: 1,
                  pt: 1,
                  color: "primary.main",
                },
              }}
            >
              {content}
            </Typography>

            <Divider sx={{ mt: 6, mb: 3 }} />

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              justifyContent="space-between"
              alignItems={{
                xs: "stretch",
                sm: "center",
              }}
              spacing={2}
            >
              <Typography variant="body2" color="text.secondary">
                Written by {author_username || "Unknown author"}
              </Typography>

              <Stack direction="row" spacing={1}>
                {isArticleOwner && (
                  <Tooltip title="Edit article">
                    <IconButton
                      onClick={() => navigate(`/articles/${id}/edit`)}
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        color: "primary.main",
                      }}
                    >
                      <EditRounded />
                    </IconButton>
                  </Tooltip>
                )}

                <Button
                  variant="contained"
                  startIcon={<ArrowBackRounded />}
                  onClick={() => navigate("/")}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  All articles
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
