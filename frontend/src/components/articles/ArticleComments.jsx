import { useEffect, useState } from "react";
import axios from "axios";

import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SendRoundedIcon from "@mui/icons-material/SendRounded";

function formatDate(dateString) {
  if (!dateString) return "";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function ArticleComments({ articleId, comments = [], showComments }) {
  const [currentComments, setCurrentComments] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setCurrentComments(comments);
  }, [comments]);

  async function handleAddComment(event) {
    event.preventDefault();

    const content = newComment.trim();

    if (!content || isSending) return;

    try {
      setIsSending(true);
      setError("");

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8000/api/comments/",
        {
          article: articleId,
          content,
        },
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
    <Collapse in={showComments} unmountOnExit>
      <Divider />

      <Box
        sx={{
          px: 2,
          py: 2,
          backgroundColor: "action.hover",
          textAlign: "left",
        }}
      >
        {currentComments.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            No comments yet. Be the first to comment.
          </Typography>
        ) : (
          <Stack spacing={1.7} sx={{ mb: 2 }}>
            {currentComments.map((comment) => (
              <Stack
                key={comment.id}
                direction="row"
                spacing={1}
                alignItems="flex-start"
              >
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: 13,
                    bgcolor: "primary.main",
                    flexShrink: 0,
                  }}
                >
                  {comment.author_username?.charAt(0)?.toUpperCase() || "U"}
                </Avatar>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box
                    sx={{
                      width: "fit-content",
                      maxWidth: "100%",
                      px: 1.5,
                      py: 1,
                      borderRadius: 3,
                      backgroundColor: "background.paper",
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        fontWeight: 700,
                      }}
                    >
                      {comment.author_username || "Unknown user"}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ overflowWrap: "anywhere" }}
                    >
                      {comment.content}
                    </Typography>
                  </Box>

                  {comment.created_at && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        mt: 0.4,
                        ml: 1,
                      }}
                    >
                      {formatDate(comment.created_at)}
                    </Typography>
                  )}
                </Box>
              </Stack>
            ))}
          </Stack>
        )}

        <Divider sx={{ mb: 2 }} />

        <Box component="form" onSubmit={handleAddComment}>
          <Stack direction="row" spacing={1} alignItems="flex-start">
            <Avatar
              sx={{
                width: 34,
                height: 34,
                fontSize: 14,
                bgcolor: "primary.main",
                flexShrink: 0,
              }}
            >
              U
            </Avatar>

            <TextField
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              placeholder="Write a comment..."
              size="small"
              fullWidth
              multiline
              maxRows={4}
              disabled={isSending}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 4,
                  backgroundColor: "background.paper",
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={!newComment.trim() || isSending}
              sx={{
                minWidth: 42,
                width: 42,
                height: 40,
                borderRadius: "50%",
                p: 0,
              }}
            >
              {isSending ? (
                <CircularProgress size={19} color="inherit" />
              ) : (
                <SendRoundedIcon fontSize="small" />
              )}
            </Button>
          </Stack>

          {error && (
            <Typography
              variant="caption"
              color="error"
              sx={{
                display: "block",
                mt: 1,
                ml: 5.5,
              }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Collapse>
  );
}

export default ArticleComments;
