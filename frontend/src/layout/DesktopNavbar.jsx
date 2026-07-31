import { AccountCircle, AutoGraph, Psychology } from "@mui/icons-material";

import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
  Typography,
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
    if (location.pathname.startsWith("/my_articles")) {
      return "/my_articles";
    }

    if (location.pathname.startsWith("/admin/users")) {
      return "/admin/users";
    }

    if (location.pathname.startsWith("/ml-insights")) {
      return "/ml-insights";
    }

    if (location.pathname.startsWith("/ml-playground")) {
      return "/ml-playground";
    }

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
        }}
      >
        <SearchBar />

        <Typography
          component="button"
          onClick={() => navigate("/")}
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            color: "primary.main",
            fontSize: "1.35rem",
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            p: 0,

            "&:hover": {
              opacity: 0.75,
            },
          }}
        >
          Article Hub
        </Typography>

        {user ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Tabs
              value={activeTab}
              sx={{
                minHeight: 60,

                "& .MuiTabs-indicator": {
                  display: "none",
                },
              }}
            >
              {canManageArticles && (
                <Tab
                  value="/my_articles"
                  label="My articles"
                  onClick={() => navigate("/my_articles")}
                  sx={{
                    minHeight: 60,
                    fontWeight: activeTab === "/my_articles" ? 700 : 400,

                    "&.Mui-selected": {
                      color: "text.primary",
                    },
                  }}
                />
              )}

              <Tab
                value="/ml-insights"
                label="ML Insights"
                icon={<AutoGraph />}
                iconPosition="start"
                onClick={() => navigate("/ml-insights")}
                sx={{
                  minHeight: 60,
                  fontWeight: activeTab === "/ml-insights" ? 700 : 400,

                  "&.Mui-selected": {
                    color: "text.primary",
                  },
                }}
              />

              <Tab
                value="/ml-playground"
                label="ML Playground"
                icon={<Psychology />}
                iconPosition="start"
                onClick={() => navigate("/ml-playground")}
                sx={{
                  minHeight: 60,
                  fontWeight: activeTab === "/ml-playground" ? 700 : 400,

                  "&.Mui-selected": {
                    color: "text.primary",
                  },
                }}
              />

              {user.role === "admin" && (
                <Tab
                  value="/admin/users"
                  label="Users"
                  onClick={() => navigate("/admin/users")}
                  sx={{
                    minHeight: 60,
                    fontWeight: activeTab === "/admin/users" ? 700 : 400,

                    "&.Mui-selected": {
                      color: "text.primary",
                    },
                  }}
                />
              )}
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
          <Tooltip title="Login" arrow placement="bottom">
            <IconButton
              aria-label="Login"
              onClick={() => navigate("/login")}
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

export default DesktopNavbar;
