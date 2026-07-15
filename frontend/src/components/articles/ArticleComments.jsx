import { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  CheckBoxOutlineBlank,
  CheckBoxOutlineBlankRounded,
} from "@mui/icons-material";
CheckBoxOutlineBlankRounded;

function ArticleComments({ comments = [] }) {
  const [showComments, setShowComments] = useState(false);

  function handleToggleComments() {
    setShowComments((prev) => !prev);
  }

  return (
    <>
      <Tooltip title={showComments ? "Hide comments" : "Show comments"}>
        <IconButton
          onClick={handleToggleComments}
          size="small"
          aria-label="show comments"
        >
          <Stack direction="row" spacing={0.6} alignItems="center">
            <CheckBoxOutlineBlankRounded sx={{ fontSize: 17 }} />

            <Typography variant="caption">{comments.length}</Typography>
          </Stack>
        </IconButton>
      </Tooltip>

      <Collapse in={showComments}>
        <Stack spacing={1.5} sx={{ mt: 2 }}>
          {comments.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No comments yet
            </Typography>
          ) : (
            comments.map((comment) => (
              <Box
                key={comment.id}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: "action.hover",
                }}
              >
                <Typography variant="subtitle2">
                  {comment.username || "Anonymous"}
                </Typography>

                <Typography variant="body2">{comment.content}</Typography>
              </Box>
            ))
          )}
        </Stack>
      </Collapse>
    </>
  );
}

export default ArticleComments;
