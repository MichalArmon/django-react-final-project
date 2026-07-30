import {
  Avatar,
  Button,
  Divider,
  Popover,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { Logout } from "@mui/icons-material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../providers/UserProvider";
import { getUser } from "../services/localStorageService";

function UserMenu({ anchorEl, handleClose }) {
  const { user, handleLogOutUser, setUser } = useUser();

  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const open = Boolean(anchorEl);

  useEffect(() => {
    const storedUser = getUser();
    setUser(storedUser);
  }, []);

  if (!user) return null;

  const handleManageAccount = () => {
    handleClose();
    navigate("/profile/edit");
  };

  const handleSignOut = () => {
    handleLogOutUser();
    handleClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={isMobile ? null : anchorEl}
      anchorReference={isMobile ? "none" : "anchorEl"}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: {
            position: isMobile ? "fixed" : "absolute",

            top: isMobile ? "125px !important" : "auto",

            left: isMobile ? "50% !important" : "auto",

            right: isMobile ? "auto !important" : undefined,

            transform: isMobile ? "translateX(-50%) !important" : "none",

            width: isMobile ? "calc(100vw - 32px)" : 280,

            maxWidth: 360,

            bgcolor: "background.paper",
            borderRadius: 4,
            mt: isMobile ? 0 : 1.5,
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
            p: 2,
          },
        },
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontWeight: 500,
            overflowWrap: "anywhere",
            textAlign: "center",
          }}
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

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Hi, {user.name}!
        </Typography>

        <Button
          onClick={handleManageAccount}
          variant="outlined"
          sx={{
            borderRadius: 8,
            textTransform: "none",
            px: 3,
            borderColor: "divider",
            color: "text.primary",
          }}
        >
          Manage your Account
        </Button>

        <Divider sx={{ width: "100%", my: 1 }} />

        <Button
          fullWidth
          startIcon={<Logout />}
          onClick={handleSignOut}
          sx={{
            borderRadius: 8,
            color: "error.main",
            textTransform: "none",
            py: 1.5,

            "&:hover": {
              bgcolor: "rgba(211, 47, 47, 0.06)",
            },
          }}
        >
          Sign out
        </Button>
      </Stack>
    </Popover>
  );
}

export default UserMenu;
