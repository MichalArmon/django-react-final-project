import {
  AccountCircle,
  AutoGraph,
  FavoriteRounded,
  Psychology,
} from "@mui/icons-material";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useUser } from "../providers/UserProvider";
import SearchBar from "../components/articles/SearchBar";
import UserMenu from "../components/UserMenu";

function DesktopNavbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const getActiveTab = () => {
    if (location.pathname.startsWith("/my_articles")) return "/my_articles";

    if (location.pathname.startsWith("/favorites")) return "/favorites";

    if (location.pathname.startsWith("/admin/users")) return "/admin/users";

    if (location.pathname.startsWith("/ml-insights")) return "/ml-insights";

    if (location.pathname.startsWith("/ml-playground")) return "/ml-playground";

    if (location.pathname.startsWith("/articles")) return "/articles";

    return false;
  };

  const activeTab = getActiveTab();

  const canManageArticles = user?.role === "manager" || user?.role === "admin";

  return (
    <AppBar
      elevation={0}
      sx={{
        width: "100%",
        height: 60,
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: 10000000,
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          px: 2,
          gap: 2,
        }}
      >
        {/* SEARCH */}
        <Box
          sx={{
            width: { md: 230, lg: 300 },
            flexShrink: 1,
            minWidth: 110,
            "& > *": {
              maxWidth: "100%",
            },
          }}
        >
          <SearchBar />
        </Box>

        {/* CENTERED LOGO */}
        <Box
          component="button"
          type="button"
          aria-label="Article Hub Home"
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: { md: 135, lg: 155 },
            height: "100%",
            border: 0,
            bgcolor: "transparent",
            cursor: "pointer",
            p: 0,
            zIndex: 1,
            transition: "opacity 0.2s ease",

            "&:hover": {
              opacity: 0.8,
            },
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Article Hub"
            sx={{
              width: "100%",
              maxHeight: 42,
              objectFit: "contain",
            }}
          />
        </Box>

        {/* NAVIGATION */}
        {user ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              minWidth: 0,
              maxWidth: {
                md: "calc(50% - 85px)",
                lg: "calc(50% - 95px)",
              },
            }}
          >
            <Tabs
              value={activeTab}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                minHeight: 60,
                minWidth: 0,

                "& .MuiTabs-indicator": {
                  display: "none",
                },

                "& .MuiTab-root": {
                  minHeight: 60,
                  minWidth: "auto",
                  px: { md: 0.7, lg: 1 },
                  fontSize: { md: "0.68rem", lg: "0.73rem" },
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                  textTransform: "uppercase",
                  color: "text.secondary",
                },

                "& .MuiTab-root.Mui-selected": {
                  color: "text.primary",
                  fontWeight: 700,
                },

                "& .MuiTab-iconWrapper": {
                  fontSize: 19,
                  mr: 0.5,
                },
              }}
            >
              {canManageArticles && (
                <Tab
                  value="/my_articles"
                  label="My Articles"
                  onClick={() => navigate("/my_articles")}
                />
              )}

              <Tab
                value="/favorites"
                label="Favorites"
                icon={<FavoriteRounded />}
                iconPosition="start"
                onClick={() => navigate("/favorites")}
              />

              <Tab
                value="/articles"
                label="Articles"
                icon={<AutoGraph />}
                iconPosition="start"
                onClick={() => navigate("/articles")}
              />

              <Tab
                value="/ml-insights"
                label="ML Insights"
                icon={<AutoGraph />}
                iconPosition="start"
                onClick={() => navigate("/ml-insights")}
              />

              <Tab
                value="/ml-playground"
                label="ML Playground"
                icon={<Psychology />}
                iconPosition="start"
                onClick={() => navigate("/ml-playground")}
              />

              {user.role === "admin" && (
                <Tab
                  value="/admin/users"
                  label="Users"
                  onClick={() => navigate("/admin/users")}
                />
              )}
            </Tabs>

            {/* USER AVATAR */}
            <Box sx={{ flexShrink: 0 }}>
              <Tooltip title="Open user menu" arrow>
                <IconButton
                  onClick={handleOpenUserMenu}
                  aria-label="Open user menu"
                  sx={{ p: 0 }}
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
          <Tooltip title="Login" arrow placement="bottom">
            <IconButton
              aria-label="Login"
              onClick={() => navigate("/login")}
              sx={{
                width: 40,
                height: 40,
                p: 0,
                "&:hover": {
                  bgcolor: "transparent",
                },
              }}
            >
              <AccountCircle sx={{ width: 40, height: 40 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </AppBar>
  );
}

export default DesktopNavbar;
