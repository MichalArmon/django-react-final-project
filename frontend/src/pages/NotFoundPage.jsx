import {
  ArrowBack,
  AutoAwesome,
  HomeRounded,
  SearchOffRounded,
} from "@mui/icons-material";

import {
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 180px)",
        display: "flex",
        alignItems: "center",
        py: { xs: 5, md: 8 },
        bgcolor: "background.default",
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            p: { xs: 3, sm: 5, md: 7 },
            borderRadius: 5,
            border: "1px solid",
            borderColor: "divider",
            textAlign: "center",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 260,
              height: 260,
              borderRadius: "50%",
              bgcolor: "rgba(109, 63, 192, 0.08)",
              top: -130,
              right: -90,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 190,
              height: 190,
              borderRadius: "50%",
              bgcolor: "rgba(242, 140, 40, 0.10)",
              bottom: -100,
              left: -60,
            }}
          />

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <Chip
              icon={<AutoAwesome />}
              label="Page not found"
              sx={{
                mb: 3,
                bgcolor: "rgba(109, 63, 192, 0.10)",
                color: "primary.main",

                "& .MuiChip-icon": {
                  color: "primary.main",
                },
              }}
            />

            <Box
              sx={{
                width: 92,
                height: 92,
                mx: "auto",
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                bgcolor: "rgba(242, 140, 40, 0.12)",
                color: "secondary.main",
              }}
            >
              <SearchOffRounded sx={{ fontSize: 50 }} />
            </Box>

            <Typography
              sx={{
                fontSize: {
                  xs: "5rem",
                  sm: "7rem",
                  md: "9rem",
                },
                fontWeight: 950,
                lineHeight: 0.9,
                color: "primary.main",
                letterSpacing: "-0.06em",
              }}
            >
              404
            </Typography>

            <Typography
              variant="h4"
              sx={{
                mt: 3,
                fontWeight: 900,
              }}
            >
              This page got lost
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 2,
                maxWidth: 560,
                mx: "auto",
                fontSize: "1.05rem",
                lineHeight: 1.8,
              }}
            >
              The page you are looking for does not exist, was moved, or the
              address may be incorrect.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              justifyContent="center"
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<HomeRounded />}
                onClick={() => navigate("/")}
                sx={{
                  px: 4,
                  py: 1.4,
                  borderRadius: 3,
                  fontWeight: 800,
                }}
              >
                Back to home
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<ArrowBack />}
                onClick={() => navigate(-1)}
                sx={{
                  px: 4,
                  py: 1.4,
                  borderRadius: 3,
                  fontWeight: 800,
                }}
              >
                Previous page
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default NotFoundPage;
