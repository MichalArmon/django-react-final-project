import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, IconButton, Tooltip, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate("");
  return (
    <AppBar
      elevation={0}
      sx={{
        width: "100%",
        height: 60,
        bgcolor: "background.default",
        borderBottom: "1px solid #ddd",
        zIndex: 10000000,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
        }}
      >
        {user ? (
          <Tooltip title={user.username} arrow>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: "primary.main",
                fontSize: "1rem",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {user.username?.charAt(0)}
            </Avatar>
          </Tooltip>
        ) : (
          <Tooltip title="REGISTER" arrow placement="top">
            <IconButton
              aria-label="Register"
              sx={{
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onClick={() => navigate("/register")}
            >
              <AccountCircle sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </AppBar>
  );
}

export default Navbar;
