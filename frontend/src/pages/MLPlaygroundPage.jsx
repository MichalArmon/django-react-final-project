import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

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

import {
  ArrowForwardRounded,
  AutoAwesomeRounded,
  BoltRounded,
  CheckCircleOutlineRounded,
  DataObjectRounded,
  LoginRounded,
  PsychologyRounded,
  RestartAltRounded,
  TrendingUpRounded,
  VisibilityOutlined,
} from "@mui/icons-material";

import { useUser } from "../providers/UserProvider";
import api from "../services/apiService";

const MotionBox = motion.create(Box);

const initialForm = {
  word_count: 500,
  is_breaking_news: false,
  author_experience_years: 3,
};

const colors = {
  background: "#FCFBFD",
  ink: "#201D2A",
  muted: "#837C8F",
  purple: "#8460B6",
  darkPurple: "#33244E",
  border: "#ECE9F0",
  lavender: "#F1EBF9",
};

function SettingTitle({ number, title, description }) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start">
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: 2,
          bgcolor: colors.lavender,
          color: colors.purple,
          display: "grid",
          placeItems: "center",
          fontWeight: 800,
          fontSize: 12,
          flexShrink: 0,
        }}
      >
        {number}
      </Box>

      <Box>
        <Typography
          sx={{
            fontWeight: 750,
            color: colors.ink,
            fontSize: 16,
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: colors.muted,
            mt: 0.3,
            lineHeight: 1.7,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function MLPlaygroundPage() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialForm);
  const [predictedViews, setPredictedViews] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [error, setError] = useState("");

  const clearResult = () => {
    setPredictedViews(null);
    setError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    clearResult();
  };

  const handleExperienceChange = (_, value) => {
    setFormData((prev) => ({
      ...prev,
      author_experience_years: value,
    }));

    clearResult();
  };

  const handleBreakingNewsChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      is_breaking_news: event.target.checked,
    }));

    clearResult();
  };

  const handleReset = () => {
    setFormData(initialForm);
    clearResult();
  };

  const handlePredict = async () => {
    const wordCount = Number(formData.word_count);
    const experience = Number(formData.author_experience_years);

    if (!Number.isFinite(wordCount) || wordCount <= 0) {
      setError("Word count must be greater than zero.");
      return;
    }

    if (!Number.isFinite(experience) || experience < 0) {
      setError("Author experience cannot be negative.");
      return;
    }

    try {
      setIsPredicting(true);
      clearResult();

      const response = await api.post("/predict-views/", {
        word_count: wordCount,
        is_breaking_news: formData.is_breaking_news,
        author_experience_years: experience,
      });

      setPredictedViews(response.data.predicted_views);
    } catch (err) {
      console.error("Prediction error:", err.response?.data || err.message);

      if (err.response?.status === 401) {
        setError("You must be logged in to run a prediction.");
      } else {
        setError(
          err.response?.data?.error || "The prediction could not be completed.",
        );
      }
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        bgcolor: colors.background,
        color: colors.ink,
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="xl">
        {/* INTRO */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            pt: { xs: 5, md: 9 },
            mb: { xs: 5, md: 7 },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <AutoAwesomeRounded sx={{ color: colors.purple, fontSize: 19 }} />

            <Typography
              variant="overline"
              sx={{
                color: colors.purple,
                fontWeight: 800,
                letterSpacing: 2,
              }}
            >
              THE INTELLIGENCE LAB
            </Typography>
          </Stack>

          <Typography
            component="h1"
            sx={{
              fontSize: { xs: 44, md: 70 },
              fontWeight: 800,
              letterSpacing: "-0.065em",
              lineHeight: 1.08,
            }}
          >
            Predict the
            <Box component="span" sx={{ color: colors.purple }}>
              {" "}
              impact.
            </Box>
          </Typography>

          <Typography
            sx={{
              maxWidth: 640,
              mt: 2.5,
              color: colors.muted,
              fontSize: { xs: 15, md: 18 },
              lineHeight: 1.8,
            }}
          >
            Explore how different article characteristics influence predicted
            readership, powered by machine learning.
          </Typography>
        </MotionBox>

        {!user && (
          <Alert
            severity="info"
            sx={{
              mb: 4,
              borderRadius: 3,
              border: `1px solid ${colors.border}`,
            }}
            action={
              <Button
                color="inherit"
                startIcon={<LoginRounded />}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            }
          >
            Sign in to run predictions with our trained model.
          </Alert>
        )}

        {/* MAIN WORKSPACE */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0, 1.05fr) minmax(0, 0.95fr)",
            },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          {/* LEFT — MODEL INPUTS */}
          <MotionBox
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                p: { xs: 3, md: 4.5 },
                border: `1px solid ${colors.border}`,
                borderRadius: 4,
                bgcolor: "#fff",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1 }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2.5,
                      bgcolor: colors.lavender,
                      color: colors.purple,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <DataObjectRounded />
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 21,
                        fontWeight: 800,
                        letterSpacing: "-0.035em",
                      }}
                    >
                      Model Inputs
                    </Typography>

                    <Typography variant="caption" sx={{ color: colors.muted }}>
                      Configure your prediction
                    </Typography>
                  </Box>
                </Stack>

                <Chip
                  label="3 PARAMETERS"
                  size="small"
                  sx={{
                    display: { xs: "none", sm: "flex" },
                    bgcolor: colors.lavender,
                    color: colors.purple,
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: 0.5,
                  }}
                />
              </Stack>

              <Box
                sx={{
                  borderTop: `1px solid ${colors.border}`,
                  mt: 3,
                  mb: 4,
                }}
              />

              <Stack spacing={5}>
                {/* WORD COUNT */}
                <Box>
                  <SettingTitle
                    number="01"
                    title="Article length"
                    description="How many words are in your article?"
                  />

                  <Box sx={{ mt: 2.5, ml: { sm: 6 } }}>
                    <TextField
                      fullWidth
                      type="number"
                      name="word_count"
                      value={formData.word_count}
                      onChange={handleChange}
                      slotProps={{
                        htmlInput: { min: 1 },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2.5,
                          bgcolor: "#FCFBFD",
                        },
                      }}
                    />

                    <Typography
                      variant="caption"
                      sx={{
                        mt: 1,
                        display: "block",
                        color: colors.muted,
                      }}
                    >
                      Total number of words
                    </Typography>
                  </Box>
                </Box>

                {/* EXPERIENCE */}
                <Box>
                  <SettingTitle
                    number="02"
                    title="Author experience"
                    description="Years of writing experience"
                  />

                  <Box sx={{ mt: 3, ml: { sm: 6 } }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mb: 1 }}
                    >
                      <Typography
                        sx={{
                          color: colors.purple,
                          fontSize: 33,
                          fontWeight: 800,
                          letterSpacing: "-0.05em",
                        }}
                      >
                        {formData.author_experience_years}
                        <Box
                          component="span"
                          sx={{
                            ml: 1,
                            fontSize: 14,
                            fontWeight: 500,
                            color: colors.muted,
                            letterSpacing: 0,
                          }}
                        >
                          years
                        </Box>
                      </Typography>

                      <Typography
                        variant="caption"
                        sx={{ color: colors.muted }}
                      >
                        0–40 years
                      </Typography>
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
                      sx={{
                        color: colors.purple,
                        "& .MuiSlider-thumb": {
                          width: 18,
                          height: 18,
                          bgcolor: "#fff",
                          border: `4px solid ${colors.purple}`,
                          boxShadow: "0 3px 12px rgba(132,96,182,0.2)",
                        },
                        "& .MuiSlider-rail": {
                          bgcolor: "#E9E2F1",
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* BREAKING NEWS */}
                <Box>
                  <SettingTitle
                    number="03"
                    title="Breaking news"
                    description="Is the article an urgent news story?"
                  />

                  <Box
                    sx={{
                      mt: 2.5,
                      ml: { sm: 6 },
                      p: 2.5,
                      borderRadius: 3,
                      border: `1px solid ${
                        formData.is_breaking_news ? "#BDA7DA" : colors.border
                      }`,
                      bgcolor: formData.is_breaking_news
                        ? "#F5EFFB"
                        : "#FCFBFD",
                      transition: "all 0.25s",
                    }}
                  >
                    <FormControlLabel
                      sx={{
                        width: "100%",
                        m: 0,
                        justifyContent: "space-between",
                      }}
                      labelPlacement="start"
                      control={
                        <Switch
                          checked={formData.is_breaking_news}
                          onChange={handleBreakingNewsChange}
                          sx={{ ml: 2 }}
                        />
                      }
                      label={
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1.2}
                        >
                          <BoltRounded
                            sx={{
                              color: formData.is_breaking_news
                                ? colors.purple
                                : "#A8A1B2",
                            }}
                          />

                          <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                            {formData.is_breaking_news
                              ? "Breaking news enabled"
                              : "Regular article"}
                          </Typography>
                        </Stack>
                      }
                    />
                  </Box>
                </Box>
              </Stack>

              {error && (
                <Alert severity="error" sx={{ mt: 4, borderRadius: 2.5 }}>
                  {error}
                </Alert>
              )}

              {/* ACTIONS */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ mt: 5 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isPredicting || !user}
                  onClick={handlePredict}
                  endIcon={
                    isPredicting ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      <ArrowForwardRounded />
                    )
                  }
                  sx={{
                    py: 1.6,
                    borderRadius: 2.5,
                    bgcolor: colors.darkPurple,
                    fontWeight: 750,
                    textTransform: "none",
                    fontSize: 15,
                    boxShadow: "none",
                    "&:hover": {
                      bgcolor: colors.purple,
                      boxShadow: "none",
                    },
                  }}
                >
                  {isPredicting ? "Analyzing..." : "Generate Prediction"}
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<RestartAltRounded />}
                  onClick={handleReset}
                  sx={{
                    px: 3,
                    py: 1.6,
                    borderRadius: 2.5,
                    textTransform: "none",
                    fontWeight: 700,
                    borderColor: colors.border,
                    color: colors.ink,
                    "&:hover": {
                      borderColor: colors.purple,
                      bgcolor: colors.lavender,
                    },
                  }}
                >
                  Reset
                </Button>
              </Stack>
            </Paper>
          </MotionBox>

          {/* RIGHT — PREDICTION RESULT */}
          <MotionBox
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <Box
              sx={{
                position: "relative",
                height: "100%",
                minHeight: 590,
                borderRadius: 4,
                overflow: "hidden",
                background:
                  "linear-gradient(145deg, #292038 0%, #49345F 55%, #76579B 100%)",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* DECORATIVE GLOW */}
              <Box
                sx={{
                  position: "absolute",
                  width: 400,
                  height: 400,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(194,150,255,0.24), transparent 70%)",
                  top: -130,
                  right: -170,
                  pointerEvents: "none",
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  width: 350,
                  height: 350,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(165,112,222,0.18), transparent 70%)",
                  bottom: -170,
                  left: -130,
                  pointerEvents: "none",
                }}
              />

              {/* PANEL HEADER */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  position: "relative",
                  p: { xs: 3, md: 4 },
                }}
              >
                <Stack direction="row" spacing={1.2} alignItems="center">
                  <PsychologyRounded sx={{ color: "#D6B8FC" }} />

                  <Typography
                    sx={{
                      fontWeight: 750,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Prediction Studio
                  </Typography>
                </Stack>

                <Chip
                  label={predictedViews !== null ? "COMPLETE" : "AI MODEL"}
                  size="small"
                  sx={{
                    bgcolor: "rgba(255,255,255,0.11)",
                    color: "#F1E5FF",
                    border: "1px solid rgba(255,255,255,0.14)",
                    fontWeight: 800,
                    fontSize: 10,
                    letterSpacing: 1,
                  }}
                />
              </Stack>

              {/* MAIN VISUALIZATION */}
              <Stack
                alignItems="center"
                justifyContent="center"
                spacing={3}
                sx={{
                  position: "relative",
                  flex: 1,
                  px: 3,
                  py: 5,
                  textAlign: "center",
                }}
              >
                <MotionBox
                  animate={{
                    scale: predictedViews !== null ? [0.9, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 0.6 }}
                  sx={{
                    position: "relative",
                    width: 190,
                    height: 190,
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "50%",
                      border: "1px solid rgba(230,205,255,0.25)",
                    }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      inset: 20,
                      borderRadius: "50%",
                      border: "1px dashed rgba(230,205,255,0.28)",
                    }}
                  />

                  <Box
                    sx={{
                      position: "absolute",
                      inset: 40,
                      borderRadius: "50%",
                      bgcolor: "rgba(232,205,255,0.12)",
                      display: "grid",
                      placeItems: "center",
                      boxShadow: "0 0 55px rgba(183,130,240,0.17)",
                    }}
                  >
                    {predictedViews !== null ? (
                      <TrendingUpRounded sx={{ fontSize: 52 }} />
                    ) : (
                      <AutoAwesomeRounded sx={{ fontSize: 52 }} />
                    )}
                  </Box>
                </MotionBox>

                {predictedViews === null ? (
                  <MotionBox
                    key="ready"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Typography
                      sx={{
                        fontSize: { xs: 28, md: 35 },
                        fontWeight: 800,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      Ready to explore?
                    </Typography>

                    <Typography
                      sx={{
                        mt: 2,
                        maxWidth: 350,
                        mx: "auto",
                        color: "rgba(255,255,255,0.68)",
                        lineHeight: 1.8,
                      }}
                    >
                      Adjust your article parameters and generate a prediction
                      to discover its estimated reach.
                    </Typography>
                  </MotionBox>
                ) : (
                  <MotionBox
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Stack
                      direction="row"
                      spacing={0.8}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <CheckCircleOutlineRounded
                        sx={{
                          fontSize: 18,
                          color: "#D9F5D9",
                        }}
                      />

                      <Typography
                        variant="overline"
                        sx={{
                          color: "#DED0EE",
                          letterSpacing: 2,
                          fontWeight: 700,
                        }}
                      >
                        PREDICTION COMPLETE
                      </Typography>
                    </Stack>

                    <Typography
                      sx={{
                        my: 2,
                        fontSize: {
                          xs: "3.7rem",
                          md: "5rem",
                        },
                        fontWeight: 800,
                        letterSpacing: "-0.07em",
                        lineHeight: 1.1,
                      }}
                    >
                      {Number(predictedViews).toLocaleString("en-US")}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 18,
                        fontWeight: 700,
                      }}
                    >
                      Estimated Views
                    </Typography>

                    <Typography
                      sx={{
                        mt: 2,
                        color: "rgba(255,255,255,0.65)",
                        maxWidth: 330,
                        mx: "auto",
                        lineHeight: 1.7,
                      }}
                    >
                      A machine-learning estimate based on your article
                      characteristics.
                    </Typography>
                  </MotionBox>
                )}
              </Stack>

              {/* RESULT FOOTER */}
              <Box
                sx={{
                  position: "relative",
                  mx: { xs: 3, md: 4 },
                  mb: { xs: 3, md: 4 },
                  p: 2.5,
                  borderRadius: 3,
                  border: "1px solid rgba(255,255,255,0.12)",
                  bgcolor: "rgba(255,255,255,0.07)",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 2 }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#D5C2EA",
                      fontWeight: 750,
                      letterSpacing: 1.2,
                    }}
                  >
                    CURRENT CONFIGURATION
                  </Typography>

                  <VisibilityOutlined
                    sx={{
                      color: "#D5C2EA",
                      fontSize: 18,
                    }}
                  />
                </Stack>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                    gap: 2,
                  }}
                >
                  {[
                    {
                      label: "WORDS",
                      value: Number(formData.word_count || 0).toLocaleString(),
                    },
                    {
                      label: "EXPERIENCE",
                      value: `${formData.author_experience_years} yrs`,
                    },
                    {
                      label: "BREAKING",
                      value: formData.is_breaking_news ? "Yes" : "No",
                    },
                  ].map((item) => (
                    <Box key={item.label}>
                      <Typography
                        sx={{
                          fontSize: 10,
                          letterSpacing: 1,
                          color: "#C9B5DB",
                          fontWeight: 700,
                        }}
                      >
                        {item.label}
                      </Typography>

                      <Typography
                        sx={{
                          mt: 0.5,
                          fontSize: { xs: 14, md: 17 },
                          fontWeight: 750,
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </MotionBox>
        </Box>

        {/* INFORMATION SECTION */}
        <MotionBox
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{
            mt: { xs: 7, md: 10 },
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            bgcolor: "#F1ECF8",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 3,
          }}
        >
          <Box>
            <Stack direction="row" spacing={1} alignItems="center">
              <PsychologyRounded sx={{ color: colors.purple }} />

              <Typography
                variant="overline"
                sx={{
                  color: colors.purple,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                }}
              >
                BEHIND THE PREDICTION
              </Typography>
            </Stack>

            <Typography
              sx={{
                mt: 1.5,
                fontSize: { xs: 26, md: 34 },
                fontWeight: 800,
                letterSpacing: "-0.05em",
              }}
            >
              A little data. A new perspective.
            </Typography>

            <Typography
              sx={{
                mt: 1.2,
                color: colors.muted,
                lineHeight: 1.8,
                maxWidth: 650,
              }}
            >
              This tool uses a trained Linear Regression model to estimate
              article views from word count, breaking-news status, and author
              experience. Results are estimates, not guarantees.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            endIcon={<ArrowForwardRounded />}
            onClick={() => navigate("/ml-insights")}
            sx={{
              flexShrink: 0,
              px: 3,
              py: 1.5,
              borderRadius: 2.5,
              color: colors.darkPurple,
              borderColor: "#CBBADA",
              fontWeight: 750,
              textTransform: "none",
              "&:hover": {
                borderColor: colors.purple,
                bgcolor: "rgba(255,255,255,0.55)",
              },
            }}
          >
            Explore ML Insights
          </Button>
        </MotionBox>
      </Container>
    </Box>
  );
}
