import { AutoGraph, GitHub, Psychology } from "@mui/icons-material";

import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <Box
      component="footer"
      sx={{
        position: "sticky",
        bottom: 0,
        zIndex: (theme) => theme.zIndex.appBar,
        mt: "auto",
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            py: 3,
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              textAlign: {
                xs: "center",
                md: "left",
              },
            }}
          >
            <Typography
              component="button"
              onClick={() => navigate("/")}
              sx={{
                border: "none",
                bgcolor: "transparent",
                color: "primary.main",
                cursor: "pointer",
                fontSize: "1.1rem",
                fontWeight: 900,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                p: 0,
              }}
            >
              Article Hub
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Articles, insights and machine learning predictions.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="ML Insights">
              <IconButton
                aria-label="ML Insights"
                onClick={() => navigate("/ml-insights")}
                sx={{
                  color: "primary.main",
                }}
              >
                <AutoGraph />
              </IconButton>
            </Tooltip>

            <Tooltip title="ML Playground">
              <IconButton
                aria-label="ML Playground"
                onClick={() => navigate("/ml-playground")}
                sx={{
                  color: "secondary.main",
                }}
              >
                <Psychology />
              </IconButton>
            </Tooltip>

            <Tooltip title="GitHub">
              <IconButton
                component="a"
                href="https://github.com/MichalArmon/django-react-final-project"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                sx={{
                  color: "text.primary",
                }}
              >
                <GitHub />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        <Divider />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            py: 2,
            textAlign: "center",
          }}
        >
          © {new Date().getFullYear()} Article Hub · Created by Michal Armon
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
