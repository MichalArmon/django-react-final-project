import {
  Box,
  IconButton,
  Avatar,
  Popover,
  Typography,
  Button,
  Divider,
  Stack,
} from "@mui/material";

import { Logout, LogoutRounded } from "@mui/icons-material";
import { useEffect } from "react";

import { useUser } from "../providers/UserProvider";
import { getUser } from "../services/localStorageService";

function UserMenu({ anchorEl, handleClose }) {
  const { user, handleLogOutUser, setUser } = useUser();
  const open = Boolean(anchorEl);
  useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);
  if (!user) return null;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          bgcolor: "background.default",
          width: 280,
          borderRadius: 4, // פינות מעוגלות כמו של גוגל
          mt: 1.5,
          boxShadow: "0px 8px 24px rgba(0,0,0,0.12)",
          p: 2,
        },
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontWeight: 500 }}
        >
          {user.email}
        </Typography>

        <Avatar
          sx={{
            width: 80,
            height: 80,
            bgcolor: "primary.main",
            fontSize: "1.25rem",
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          {user?.name?.charAt(0) || "U"}
        </Avatar>

        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Hi, {user.name}!
        </Typography>

        <Button
          variant="outlined"
          sx={{
            borderRadius: 8,
            textTransform: "none",
            px: 3,
            borderColor: "#ddd",
            color: "text.primary",
          }}
        >
          Manage your Account
        </Button>

        <Divider sx={{ width: "100%", my: 1 }} />

        {/* כפתור התנתקות */}
        <Button
          fullWidth
          startIcon={<Logout />}
          onClick={() => {
            handleLogOutUser();
            handleClose();
          }}
          sx={{
            borderRadius: 8,
            color: "error.main",
            textTransform: "none",
            py: 1.5,
            "&:hover": { bgcolor: "#fff5f5" },
          }}
        >
          Sign out
        </Button>
      </Stack>
    </Popover>
  );
}

export default UserMenu;
