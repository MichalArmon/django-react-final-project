import {
  AutoAwesome,
  Bolt,
  Login,
  Psychology,
  RestartAlt,
  TrendingUp,
} from "@mui/icons-material";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  FormControlLabel,
  Paper,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../providers/UserProvider";
import api from "../services/apiService";

const initialForm = {
  word_count: 500,
  is_breaking_news: false,
  author_experience_years: 3,
};

function MLPlaygroundPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [predictedViews, setPredictedViews] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPredictedViews(null);
    setError("");
  };

  const handleBreakingNewsChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      is_breaking_news: event.target.checked,
    }));

    setPredictedViews(null);
    setError("");
  };

  const handleExperienceChange = (_, value) => {
    setFormData((prev) => ({
      ...prev,
      author_experience_years: value,
    }));

    setPredictedViews(null);
    setError("");
  };

  const validateForm = () => {
    const wordCount = Number(formData.word_count);
    const experience = Number(formData.author_experience_years);

    if (!Number.isFinite(wordCount) || wordCount <= 0) {
      return "Word count must be greater than zero.";
    }

    if (!Number.isFinite(experience) || experience < 0) {
      return "Author experience cannot be negative.";
    }

    return "";
  };

  const handlePredict = async () => {
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsPredicting(true);
      setError("");
      setPredictedViews(null);

      const dataForServer = {
        word_count: Number(formData.word_count),
        is_breaking_news: formData.is_breaking_news,
        author_experience_years: Number(formData.author_experience_years),
      };

      const response = await api.post("/predict-views/", dataForServer);

      setPredictedViews(response.data.predicted_views);
    } catch (error) {
      console.log("Prediction error:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        setError("You must be logged in to run a prediction.");
      } else {
        setError(
          error.response?.data?.error ||
            "The prediction could not be completed.",
        );
      }
    } finally {
      setIsPredicting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setPredictedViews(null);
    setError("");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 4, md: 7 },
        // background:
        //   "radial-gradient(circle at top left, rgba(99, 102, 241, 0.16), transparent 35%), radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.14), transparent 35%)",
        // bgcolor: "background.default",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            mb: 4,
            p: { xs: 3, md: 5 },
            borderRadius: 5,
            color: "white",
            background:
              "linear-gradient(135deg, #2537a7 0%, #6740bd 55%, #a63faa 100%)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 260,
              height: 260,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.08)",
              top: -120,
              right: -60,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 150,
              height: 150,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.06)",
              bottom: -70,
              left: 90,
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Chip
              icon={<Psychology />}
              label="Machine Learning Playground"
              sx={{
                mb: 2,
                bgcolor: "rgba(255,255,255,0.16)",
                color: "white",

                "& .MuiChip-icon": {
                  color: "white",
                },
              }}
            />

            <Typography
              variant="h2"
              sx={{
                maxWidth: 850,
                fontWeight: 900,
                fontSize: {
                  xs: "2.2rem",
                  md: "4rem",
                },
                lineHeight: 1.05,
              }}
            >
              Predict article views
            </Typography>

            <Typography
              sx={{
                mt: 2,
                maxWidth: 720,
                color: "rgba(255,255,255,0.88)",
                fontSize: {
                  xs: "1rem",
                  md: "1.15rem",
                },
                lineHeight: 1.8,
              }}
            >
              Enter article information and let the trained machine learning
              model estimate its expected number of views.
            </Typography>
          </Box>
        </Paper>

        {!user && (
          <Alert
            severity="info"
            action={
              <Button
                color="inherit"
                startIcon={<Login />}
                onClick={() => navigate("/register")}
              >
                Login
              </Button>
            }
            sx={{
              mb: 3,
              borderRadius: 3,
            }}
          >
            You must be logged in because the prediction endpoint is protected.
          </Alert>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.1fr 0.9fr",
            },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 4 },
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
            }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 2.5,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                }}
              >
                <AutoAwesome />
              </Box>

              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>
                  Article data
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Complete the three features used during training.
                </Typography>
              </Box>
            </Stack>

            <Stack spacing={4} sx={{ mt: 4 }}>
              <Box>
                <Typography
                  sx={{
                    mb: 1,
                    fontWeight: 800,
                  }}
                >
                  Word count
                </Typography>

                <TextField
                  fullWidth
                  name="word_count"
                  type="number"
                  value={formData.word_count}
                  onChange={handleChange}
                  inputProps={{
                    min: 1,
                  }}
                  helperText="The total number of words in the article."
                />
              </Box>

              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 800 }}>
                      Author experience
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Years of professional experience
                    </Typography>
                  </Box>

                  <Chip
                    label={`${formData.author_experience_years} years`}
                    color="primary"
                    variant="outlined"
                  />
                </Stack>

                <Slider
                  value={Number(formData.author_experience_years)}
                  onChange={handleExperienceChange}
                  min={0}
                  max={40}
                  step={1}
                  marks={[
                    { value: 0, label: "0" },
                    { value: 10, label: "10" },
                    { value: 20, label: "20" },
                    { value: 30, label: "30" },
                    { value: 40, label: "40" },
                  ]}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: formData.is_breaking_news
                    ? "warning.main"
                    : "divider",
                  bgcolor: formData.is_breaking_news
                    ? "rgba(255, 152, 0, 0.08)"
                    : "action.hover",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_breaking_news}
                      onChange={handleBreakingNewsChange}
                    />
                  }
                  label={
                    <Box>
                      <Typography sx={{ fontWeight: 800 }}>
                        Breaking news
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        Mark whether the article is an urgent breaking news
                        story.
                      </Typography>
                    </Box>
                  }
                />
              </Paper>

              {error && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  startIcon={
                    isPredicting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      <Bolt />
                    )
                  }
                  disabled={isPredicting || !user}
                  onClick={handlePredict}
                  sx={{
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 900,
                    textTransform: "none",
                    fontSize: "1rem",
                  }}
                >
                  {isPredicting ? "Running model..." : "Run prediction"}
                </Button>

                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<RestartAlt />}
                  onClick={handleReset}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 800,
                    textTransform: "none",
                  }}
                >
                  Reset
                </Button>
              </Stack>
            </Stack>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              position: "relative",
              overflow: "hidden",
              minHeight: 480,
              p: { xs: 3, md: 4 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: 4,
              border: "1px solid",
              borderColor: predictedViews !== null ? "primary.main" : "divider",
              bgcolor: "background.paper",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                width: 230,
                height: 230,
                borderRadius: "50%",
                bgcolor: "action.hover",
                top: -100,
                right: -90,
              }}
            />

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                textAlign: "center",
              }}
            >
              {predictedViews === null ? (
                <>
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      mx: "auto",
                      mb: 3,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      bgcolor: "action.hover",
                      color: "primary.main",
                    }}
                  >
                    <TrendingUp sx={{ fontSize: 48 }} />
                  </Box>

                  <Typography variant="h4" sx={{ fontWeight: 900 }}>
                    Ready to predict
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 2,
                      maxWidth: 400,
                      mx: "auto",
                      lineHeight: 1.8,
                    }}
                  >
                    Complete the article data and press Run Prediction to
                    receive the model result.
                  </Typography>
                </>
              ) : (
                <>
                  <Chip
                    icon={<AutoAwesome />}
                    label="Prediction complete"
                    color="success"
                    sx={{ mb: 3 }}
                  />

                  <Typography
                    variant="overline"
                    color="text.secondary"
                    sx={{
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                    }}
                  >
                    Estimated article views
                  </Typography>

                  <Typography
                    sx={{
                      my: 2,
                      fontSize: {
                        xs: "4rem",
                        md: "6rem",
                      },
                      fontWeight: 950,
                      lineHeight: 1,
                      color: "primary.main",
                    }}
                  >
                    {predictedViews.toLocaleString()}
                  </Typography>

                  <Typography variant="h6" sx={{ fontWeight: 800 }}>
                    predicted views
                  </Typography>

                  <Typography
                    color="text.secondary"
                    sx={{
                      mt: 2,
                      maxWidth: 420,
                      mx: "auto",
                      lineHeight: 1.8,
                    }}
                  >
                    This value was calculated by the Linear Regression model
                    trained on your article dataset.
                  </Typography>

                  <Paper
                    elevation={0}
                    sx={{
                      mt: 4,
                      p: 2,
                      borderRadius: 3,
                      bgcolor: "action.hover",
                    }}
                  >
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        <strong>Words:</strong>{" "}
                        {Number(formData.word_count).toLocaleString()}
                      </Typography>

                      <Typography variant="body2">
                        <strong>Breaking news:</strong>{" "}
                        {formData.is_breaking_news ? "Yes" : "No"}
                      </Typography>

                      <Typography variant="body2">
                        <strong>Author experience:</strong>{" "}
                        {formData.author_experience_years} years
                      </Typography>
                    </Stack>
                  </Paper>
                </>
              )}
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default MLPlaygroundPage;
