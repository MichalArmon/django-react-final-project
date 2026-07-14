import { AccountCircle } from "@mui/icons-material";
import { AppBar, Box, IconButton, Tooltip, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import SearchBar from "../components/articles/SearchBar";

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
          height: "100%",
          display: "flex",
          alignItems: "center",
          px: 2,
          justifyContent: "space-between",
        }}
      >
        <SearchBar />
        {user ? (
          <Tooltip title={user.name} arrow>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "primary.main",
                fontSize: "1.25rem",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              {user.name?.charAt(0)}
            </Avatar>
          </Tooltip>
        ) : (
          <Tooltip title="REGISTER" arrow placement="bottom">
            <IconButton
              aria-label="Register"
              onClick={() => navigate("/register")}
              sx={{
                width: 40,
                height: 40,
                p: 0,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <AccountCircle
                sx={{
                  width: 40,
                  height: 40,
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </AppBar>
  );
}

export default Navbar;
