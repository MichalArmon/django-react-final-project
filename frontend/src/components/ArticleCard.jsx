import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import { BoltRounded, VisibilityOutlined } from "@mui/icons-material";

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

function ArticleCard({ article }) {
  const {
    title,
    content,
    author_username,
    published_at,
    views = 0,
    likes = 0,
    word_count = 0,
    tags = [],
    comments = [],
    is_breaking_news = false,
  } = article;
  const titleFixed = title.split("#")[0];
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        overflow: "hidden",
        backgroundColor: "background.paper",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 18px 45px rgba(47, 10, 69, 0.12)",
        },
      }}
    >
      <Box
        sx={{
          height: 8,
          background: is_breaking_news
            ? "linear-gradient(90deg, #ff3d71, #ff8a00)"
            : "linear-gradient(90deg, #2f0a45, #ba68c8)",
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Stack spacing={2.2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Stack direction="row" spacing={1.2} alignItems="center">
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: "primary.main",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                {author_username?.charAt(0)?.toUpperCase() || "A"}{" "}
              </Avatar>

              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                >
                  {" "}
                  {author_username || "Unknown author"}
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {" "}
                  {formatDate(published_at)}
                </Typography>
              </Box>
            </Stack>
            {is_breaking_news && (
              <Chip
                icon={<BoltRounded />}
                label="Breaking"
                size="small"
                sx={{
                  fontWeight: 700,
                  color: "#b42318",
                  backgroundColor: "#fff1f0",
                  border: "1px solid #ffccc7",
                }}
              />
            )}
          </Stack>
          <Box>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 700,
                lineHeight: 1.25,
                color: "text.primary",
                mb: 1.2,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {titleFixed}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                lineHeight: 1.75,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
                overflow: "hidden",
              }}
            >
              {content}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
      hello
    </Card>
  );
}

export default ArticleCard;
