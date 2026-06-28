import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";

function formatNumber(value = 0) {
  return new Intl.NumberFormat("en", {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatDate(dateString) {
  if (!dateString) return "";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function calculateReadingTime(wordCount = 0) {
  return Math.max(1, Math.ceil(wordCount / 200));
}

export default function ArticleCard({ article, onOpen }) {
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

  const visibleTags = tags.slice(0, 3);
  const extraTags = Math.max(0, tags.length - visibleTags.length);

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
                {author_username?.charAt(0)?.toUpperCase() || "A"}
              </Avatar>

              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: "text.primary",
                  }}
                >
                  {author_username || "Unknown author"}
                </Typography>

                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {formatDate(published_at)}
                </Typography>
              </Box>
            </Stack>

            {is_breaking_news && (
              <Chip
                icon={<BoltRoundedIcon />}
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
              {title}
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

          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {visibleTags.map((tag) => (
              <Chip
                key={typeof tag === "object" ? tag.id : tag}
                label={typeof tag === "object" ? tag.name : tag}
                size="small"
                sx={{
                  borderRadius: 2,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "primary.main",
                  backgroundColor: "rgba(186, 104, 200, 0.12)",
                }}
              />
            ))}

            {extraTags > 0 && (
              <Chip
                label={`+${extraTags}`}
                size="small"
                variant="outlined"
                sx={{ borderRadius: 2 }}
              />
            )}
          </Stack>
        </Stack>
      </CardContent>

      <Divider />

      <CardActions
        sx={{
          px: 3,
          py: 1.8,
          justifyContent: "space-between",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ color: "text.secondary" }}
        >
          <Tooltip title="Views">
            <Stack direction="row" spacing={0.6} alignItems="center">
              <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography variant="caption">{formatNumber(views)}</Typography>
            </Stack>
          </Tooltip>

          <Tooltip title="Likes">
            <Stack direction="row" spacing={0.6} alignItems="center">
              <FavoriteBorderRoundedIcon sx={{ fontSize: 18 }} />
              <Typography variant="caption">{formatNumber(likes)}</Typography>
            </Stack>
          </Tooltip>

          <Tooltip title="Comments">
            <Stack direction="row" spacing={0.6} alignItems="center">
              <ChatBubbleOutlineRoundedIcon sx={{ fontSize: 17 }} />
              <Typography variant="caption">{comments.length}</Typography>
            </Stack>
          </Tooltip>

          <Tooltip title="Reading time">
            <Stack direction="row" spacing={0.6} alignItems="center">
              <AccessTimeRoundedIcon sx={{ fontSize: 18 }} />
              <Typography variant="caption">
                {calculateReadingTime(word_count)} min
              </Typography>
            </Stack>
          </Tooltip>
        </Stack>

        {/* <Tooltip title="Read article">
          <IconButton
            onClick={() => onOpen?.(article)}
            sx={{
              color: "primary.main",
              border: "1px solid",
              borderColor: "divider",
              "&:hover": {
                backgroundColor: "rgba(47, 10, 69, 0.06)",
              },
            }}
          >
            <ArrowForwardRoundedIcon />
          </IconButton>
        </Tooltip> */}
      </CardActions>
    </Card>
  );
}
