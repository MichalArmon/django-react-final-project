import {
  Avatar,
  Box,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { DeleteOutlineRounded } from "@mui/icons-material";

import { useComment } from "../../providers/CommentProvider";
import { useUser } from "../../providers/UserProvider";
import CreateComment from "../comments/CreateComment";

function formatDate(dateString) {
  if (!dateString) return "";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function ArticleComments({
  id,
  comments = [],
  showComments,
  setShowComments,
  onCommentCreated,
}) {
  const { handleDeleteComment } = useComment();
  const { user } = useUser();

  const isAdmin =
    user?.is_staff === true ||
    user?.is_superuser === true ||
    user?.role === "admin";

  const handleDelete = async (commentId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this comment?",
    );

    if (!isConfirmed) return;

    try {
      await handleDeleteComment(commentId);
    } catch (error) {
      console.error("Delete comment failed:", error);
    }
  };

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
            {comments.map((comment) => {
              const isCommentOwner =
                Number(comment.user) === Number(user?.user_id);

              const canDeleteComment = isCommentOwner || isAdmin;

              return (
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
                        sx={{
                          overflowWrap: "anywhere",
                        }}
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

                  {canDeleteComment && (
                    <Tooltip title="Delete comment">
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(comment.id)}
                        aria-label="delete comment"
                        sx={{
                          color: "text.secondary",
                          "&:hover": {
                            color: "error.main",
                            backgroundColor: "rgba(211, 47, 47, 0.08)",
                          },
                        }}
                      >
                        <DeleteOutlineRounded fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Stack>
              );
            })}
          </Stack>
        )}

        <Divider sx={{ mb: 2 }} />

        <CreateComment
          setShowComments={setShowComments}
          showComments={showComments}
          articleId={id}
          onCommentCreated={onCommentCreated}
        />
      </Box>
    </Collapse>
  );
}

export default ArticleComments;
