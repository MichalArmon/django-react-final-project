import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";

function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatNumber(value = 0) {
  if (value < 1000) {
    return value.toString();
  }

  const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  });

  return formatter.format(value);
}

function calculateReadingTime(wordCount = 0) {
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return Math.max(1, readingTime);
}

function InfoItem({ icon, text }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.7}
      sx={{
        color: "text.secondary",
      }}
    >
      {icon}

      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
}

function CommentCard({ comment }) {
  const username = comment.username || "Anonymous";

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderRadius: 3,
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Avatar
          sx={{
            width: 42,
            height: 42,
            backgroundColor: "primary.main",
            fontWeight: 700,
          }}
        >
          {username.charAt(0).toUpperCase()}
        </Avatar>

        <Box sx={{ flex: 1 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={0.5}
          >
            <Typography fontWeight={700}>{username}</Typography>

            <Typography variant="caption" color="text.secondary">
              {formatDate(comment.created_at)}
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              lineHeight: 1.8,
              whiteSpace: "pre-line",
            }}
          >
            {comment.content}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

function ArticleDetailPage() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchArticle() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `http://127.0.0.1:8000/api/articles/${id}/`,
        );

        if (!response.ok) {
          throw new Error("Article could not be loaded");
        }

        const articleData = await response.json();

        setArticle(articleData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticle();
  }, [id]);

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

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Alert severity="warning">Article not found.</Alert>
      </Container>
    );
  }

  const tags = article.tags || [];
  const comments = article.comments || [];

  const readingTime = calculateReadingTime(article.word_count);

  const authorName =
    article.author_username || article.author?.username || "Unknown author";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 3, md: 7 },
        background:
          "linear-gradient(180deg, rgba(186,104,200,0.10) 0%, rgba(255,255,255,0) 420px)",
      }}
    >
      <Container maxWidth="md">
        <Card
          elevation={0}
          sx={{
            borderRadius: { xs: 3, md: 5 },
            overflow: "hidden",
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.paper",
            boxShadow: "0 24px 70px rgba(30, 30, 60, 0.10)",
          }}
        >
          <Box
            sx={{
              px: { xs: 2.5, sm: 4, md: 6 },
              pt: { xs: 3, md: 5 },
              pb: { xs: 3, md: 4 },
              background:
                "linear-gradient(135deg, rgba(156,39,176,0.13), rgba(103,58,183,0.05))",
            }}
          >
            <Stack spacing={2.5}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
              >
                <Chip
                  icon={<LocalOfferOutlinedIcon />}
                  label="Article"
                  size="small"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 700,
                    color: "primary.main",
                    backgroundColor: "rgba(156, 39, 176, 0.12)",
                  }}
                />

                {article.is_breaking_news && (
                  <Chip
                    icon={<WhatshotOutlinedIcon />}
                    label="Breaking news"
                    size="small"
                    color="error"
                    sx={{
                      borderRadius: 2,
                      fontWeight: 700,
                    }}
                  />
                )}
              </Stack>

              <Typography
                component="h1"
                sx={{
                  fontSize: {
                    xs: "2rem",
                    sm: "2.7rem",
                    md: "3.4rem",
                  },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.04em",
                  color: "text.primary",
                }}
              >
                {article.title}
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                flexWrap="wrap"
                gap={1.5}
              >
                <InfoItem
                  icon={<PersonOutlineIcon fontSize="small" />}
                  text={authorName}
                />

                <InfoItem
                  icon={<CalendarMonthOutlinedIcon fontSize="small" />}
                  text={formatDate(article.published_at)}
                />

                <InfoItem
                  icon={<ScheduleOutlinedIcon fontSize="small" />}
                  text={`${readingTime} min read`}
                />

                <InfoItem
                  icon={<VisibilityOutlinedIcon fontSize="small" />}
                  text={`${formatNumber(article.views)} views`}
                />

                <InfoItem
                  icon={<FavoriteBorderOutlinedIcon fontSize="small" />}
                  text={`${formatNumber(article.likes)} likes`}
                />
              </Stack>
            </Stack>
          </Box>

          <CardContent
            sx={{
              p: {
                xs: 2.5,
                sm: 4,
                md: 6,
              },
            }}
          >
            {tags.length > 0 && (
              <>
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 4 }}>
                  {tags.map((tag) => {
                    const tagId = typeof tag === "object" ? tag.id : tag;

                    const tagName = typeof tag === "object" ? tag.name : tag;

                    return (
                      <Chip
                        key={tagId}
                        label={`#${tagName}`}
                        size="small"
                        sx={{
                          borderRadius: 2,
                          px: 0.5,
                          fontSize: 13,
                          fontWeight: 700,
                          color: "primary.main",
                          backgroundColor: "rgba(186, 104, 200, 0.12)",
                        }}
                      />
                    );
                  })}
                </Stack>

                <Divider sx={{ mb: 4 }} />
              </>
            )}

            <Typography
              component="div"
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.08rem",
                },
                lineHeight: 1.95,
                color: "text.primary",
                whiteSpace: "pre-line",

                "& p": {
                  mb: 2,
                },
              }}
            >
              {article.content}
            </Typography>

            <Divider sx={{ my: 5 }} />

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 3 }}
            >
              <ChatBubbleOutlineOutlinedIcon color="primary" />

              <Typography
                variant="h5"
                component="h2"
                sx={{
                  fontWeight: 800,
                }}
              >
                Comments
              </Typography>

              <Chip
                label={comments.length}
                size="small"
                sx={{
                  fontWeight: 700,
                }}
              />
            </Stack>

            {comments.length > 0 ? (
              <Stack spacing={2}>
                {comments.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                ))}
              </Stack>
            ) : (
              <Paper
                variant="outlined"
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                  borderStyle: "dashed",
                  backgroundColor: "rgba(0, 0, 0, 0.01)",
                }}
              >
                <Typography color="text.secondary">
                  There are no comments yet.
                </Typography>
              </Paper>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default ArticleDetailPage;
