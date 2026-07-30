import { AccountCircle } from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../providers/UserProvider";
import SearchBar from "../components/articles/SearchBar";

import { useState } from "react";
import UserMenu from "../components/UserMenu";

function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [registerIsOpen, setRegisterIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleRegisterOpen = () => {
    setRegisterIsOpen((prev) => !prev);
    setLoginIsOpen((prev) => !prev);
    {
      registerIsOpen || loginIsOpen ? navigate("/register") : navigate("/");
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };
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
          <Box sx={{ justifyContent: "space-around", display: "flex" }}>
            <Tabs sx={{ p: 0, m: 0 }} value={0}>
              <Tab
                label="My articles"
                onClick={() => navigate("/my_articles")}
              />
              {user.role === "admin" ? (
                <Tab label="users" onClick={() => navigate("/admin/users")} />
              ) : null}
            </Tabs>
            <Box sx={{ position: "relative" }}>
              <Tooltip title="Open user menu" arrow>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  aria-label="open user menu"
                >
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
                    {user?.name?.charAt(0) || "U"}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <UserMenu anchorEl={anchorEl} handleClose={handleCloseUserMenu} />
            </Box>
          </Box>
        ) : (
          <Tooltip title="REGISTER" arrow placement="bottom">
            <IconButton
              aria-label="Register"
              onClick={toggleRegisterOpen}
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
