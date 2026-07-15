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
import useForm from "../../hooks/useForm";

function CreateComment() {
  return (
    <Box component="form" onSubmit={handleAddComment()}>
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
            <SendToMobileRounded fontSize="small" />
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
  );
}

export default CreateComment;
