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
import initialDataComment from "../../initialData/initialDataComment";
import { commentSchema } from "../../models/Comment";

function CreateComment() {
  const { handleAddComment, isSending } = useComment();
  const { handleChange, handleSubmit, errors, formDetails } = useForm(
    initialDataComment,
    commentSchema,
    handleAddComment,
  );
  return (
    <Box component="form" onSubmit={handleSubmit}>
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
          name="content"
          onChange={handleChange}
          value={formDetails.content}
          error={Boolean(errors.content)}
          helperText={errors.content}
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
          disabled={!formDetails.content.trim() || isSending}
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
    </Box>
  );
}

export default CreateComment;
