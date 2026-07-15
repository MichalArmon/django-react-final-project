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

import { SendToMobileRounded } from "@mui/icons-material";
import { useComment } from "../../providers/CommentProvider";

function formatDate(dateString) {
  if (!dateString) return "";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function ArticleComments({ articleName, comments = [], showComments }) {
  const { currentComments, handleAddComment, isSending } = useComment;
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
        {comments.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            No comments yet. Be the first to comment.
          </Typography>
        ) : (
          <Stack spacing={1.7} sx={{ mb: 2 }}>
            {comments.map((comment) => (
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
                  {comment.username?.charAt(0)?.toUpperCase() || "U"}
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
                      {comment.username || "Unknown user"}
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
      </Box>
    </Collapse>
  );
}

export default ArticleComments;
