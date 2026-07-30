import {
  AccountCircle,
  AdminPanelSettingsOutlined,
  ArticleOutlined,
  AutoGraph,
  MenuRounded,
  Psychology,
} from "@mui/icons-material";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useUser } from "../providers/UserProvider";
import SearchBar from "../components/articles/SearchBar";
import UserMenu from "../components/UserMenu";

function MobileNavbar() {
  const { user } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  const [navigationAnchor, setNavigationAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);

  const navigationMenuIsOpen = Boolean(navigationAnchor);

  const handleOpenNavigationMenu = (event) => {
    setNavigationAnchor(event.currentTarget);
  };

  const handleCloseNavigationMenu = () => {
    setNavigationAnchor(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleCloseNavigationMenu();
  };

  const handleOpenUserMenu = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuAnchor(null);
  };

  const isMyArticlesPage = location.pathname.startsWith("/my_articles");

  const isUsersPage = location.pathname.startsWith("/admin/users");

  const isMLInsightsPage = location.pathname.startsWith("/ml-insights");

  const isMLPlaygroundPage = location.pathname.startsWith("/ml-playground");

  return (
    <AppBar
      elevation={0}
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",

        // חשוב:
        // נותן ל-Menu של MUI להופיע מעל ה-Navbar
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      {/* השורה העליונה */}
      <Box
        sx={{
          height: 58,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          px: 1.5,
        }}
      >
        {user ? (
          <>
            <IconButton
              onClick={handleOpenNavigationMenu}
              aria-label="open navigation menu"
            >
              <MenuRounded />
            </IconButton>

            <Menu
              anchorEl={navigationAnchor}
              open={navigationMenuIsOpen}
              onClose={handleCloseNavigationMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    minWidth: 220,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                  },
                },
              }}
            >
              <MenuItem
                selected={isMyArticlesPage}
                onClick={() => handleNavigate("/my_articles")}
              >
                <ListItemIcon>
                  <ArticleOutlined fontSize="small" />
                </ListItemIcon>
                My Articles
              </MenuItem>

              <MenuItem
                selected={isMLInsightsPage}
                onClick={() => handleNavigate("/ml-insights")}
              >
                <ListItemIcon>
                  <AutoGraph fontSize="small" />
                </ListItemIcon>
                ML Insights
              </MenuItem>

              <MenuItem
                selected={isMLPlaygroundPage}
                onClick={() => handleNavigate("/ml-playground")}
              >
                <ListItemIcon>
                  <Psychology fontSize="small" />
                </ListItemIcon>
                ML Playground
              </MenuItem>

              {user.role === "admin" && (
                <MenuItem
                  selected={isUsersPage}
                  onClick={() => handleNavigate("/admin/users")}
                >
                  <ListItemIcon>
                    <AdminPanelSettingsOutlined fontSize="small" />
                  </ListItemIcon>
                  Users
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ width: 40 }} />
        )}

        <Typography
          component="button"
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            maxWidth: 170,
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "primary.main",
            fontSize: "1rem",
            fontWeight: 800,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            p: 0,

            "&:hover": {
              opacity: 0.75,
            },
          }}
        >
          Article Hub
        </Typography>

        {user ? (
          <Box sx={{ position: "relative" }}>
            <Tooltip title="Open user menu" arrow>
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                aria-label="open user menu"
              >
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
                  {user?.name?.charAt(0) || "U"}
                </Avatar>
              </IconButton>
            </Tooltip>

            <UserMenu
              anchorEl={userMenuAnchor}
              handleClose={handleCloseUserMenu}
            />
          </Box>
        ) : (
          <Tooltip title="Login" arrow>
            <IconButton
              aria-label="login"
              onClick={() => navigate("/login")}
              sx={{ p: 0 }}
            >
              <AccountCircle
                sx={{
                  width: 38,
                  height: 38,
                }}
              />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      {/* שורת החיפוש */}
      <Box
        sx={{
          width: "100%",
          px: 1.5,
          py: 1.25,
          backgroundColor: "rgba(141, 119, 99, 0.12)",
          borderTop: "1px solid",
          borderColor: "divider",

          "& > *": {
            width: "70%",
          },
        }}
      >
        <SearchBar />
      </Box>
    </AppBar>
  );
}

export default MobileNavbar;
