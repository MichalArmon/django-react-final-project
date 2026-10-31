import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowForwardRounded,
  AutoAwesomeRounded,
  AutoGraphRounded,
  CheckCircleOutlineRounded,
  CodeRounded,
  DataObjectRounded,
  PsychologyRounded,
  SaveRounded,
  ScienceRounded,
  TrendingUpRounded,
} from "@mui/icons-material";

const MotionBox = motion.create(Box);

const colors = {
  background: "#FCFBFD",
  ink: "#201D2A",
  muted: "#837C8F",
  purple: "#8460B6",
  darkPurple: "#33244E",
  border: "#ECE9F0",
  lavender: "#F1EBF9",
};

const features = [
  {
    title: "Word Count",
    description: "The length of an article, measured in words.",
    number: "01",
  },
  {
    title: "Breaking News",
    description: "Whether an article is marked as urgent news.",
    number: "02",
  },
  {
    title: "Author Experience",
    description: "The author's years of professional experience.",
    number: "03",
  },
];

const preparationCode = `with open("articals.json", "r", encoding="utf-8") as file:
    data = json.load(file)

articles = data["articles"]

rows = []

for article in articles:
    author_profile = article["author"]["profile"]

    row = {
        "word_count": article["word_count"],
        "is_breaking_news": int(article["is_breaking_news"]),
        "tags_count": len(article["tags"]),
        "author_age": author_profile["age"],
        "author_experience_years":
            author_profile["experience_years"],
        "views": article["views"],
    }

    rows.append(row)

articles_df = pd.DataFrame(rows)`;

const trainingCode = `X = articles_df[
    [
        "word_count",
        "is_breaking_news",
        "author_experience_years",
    ]
]

y = articles_df["views"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
)

model = LinearRegression()
model.fit(X_train, y_train)`;

const evaluationCode = `predictions = model.predict(X_test)

mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("MAE:", mae)
print("R²:", r2)`;

const savingCode = `joblib.dump(
    model,
    "article_views_model.pkl"
)

joblib.dump(
    feature_columns,
    "article_views_features.pkl"
)`;

function CodePanel({ code, filename = "model.py" }) {
  return (
    <Box
      sx={{
        mt: 3,
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "#211C2D",
        border: "1px solid #373044",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          px: 2.5,
          py: 1.5,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Stack direction="row" spacing={0.8}>
          {["#FF7474", "#F4C76A", "#77C99B"].map((color) => (
            <Box
              key={color}
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                bgcolor: color,
              }}
            />
          ))}
        </Stack>

        <Typography
          sx={{
            fontFamily: "monospace",
            fontSize: 12,
            color: "#B8AFC7",
          }}
        >
          {filename}
        </Typography>

        <CodeRounded sx={{ fontSize: 17, color: "#B8AFC7" }} />
      </Stack>

      <Box
        component="pre"
        sx={{
          m: 0,
          p: { xs: 2, md: 3 },
          overflowX: "auto",
          color: "#E8DDF4",
          fontFamily: '"Fira Code", Consolas, monospace',
          fontSize: { xs: 11, sm: 13 },
          lineHeight: 1.9,
          whiteSpace: "pre",
          tabSize: 4,
        }}
      >
        <Box component="code">{code}</Box>
      </Box>
    </Box>
  );
}

function SectionHeading({ number, title, description, icon }) {
  return (
    <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 3 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          display: "grid",
          placeItems: "center",
          borderRadius: 2.5,
          bgcolor: colors.lavender,
          color: colors.purple,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          variant="overline"
          sx={{
            color: colors.purple,
            fontWeight: 800,
            letterSpacing: 1.5,
          }}
        >
          STEP {number}
        </Typography>

        <Typography
          component="h2"
          sx={{
            fontSize: { xs: 23, md: 29 },
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: "-0.045em",
            color: colors.ink,
            mt: 0.4,
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: colors.muted,
            lineHeight: 1.8,
            mt: 1.2,
          }}
        >
          {description}
        </Typography>
      </Box>
    </Stack>
  );
}

function TimelineSection({ number, title, description, icon, children }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55 }}
      sx={{
        position: "relative",
        pl: { xs: 3, md: 6 },
        pb: 4,
        borderLeft: `1px solid #DDD3E9`,
        "&::before": {
          content: '""',
          position: "absolute",
          width: 11,
          height: 11,
          borderRadius: "50%",
          bgcolor: colors.purple,
          top: 30,
          left: -6,
          boxShadow: `0 0 0 5px ${colors.background}`,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 4 },
          borderRadius: 4,
          border: `1px solid ${colors.border}`,
          bgcolor: "#fff",
        }}
      >
        <SectionHeading
          number={number}
          title={title}
          description={description}
          icon={icon}
        />

        {children}
      </Paper>
    </MotionBox>
  );
}

function InfoCard({ label, title, description }) {
  return (
    <Box
      sx={{
        p: 3,
        flex: 1,
        minWidth: 0,
        bgcolor: "#FAF8FD",
        border: `1px solid ${colors.border}`,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: colors.purple,
          fontWeight: 800,
          letterSpacing: 1.2,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: "-0.03em",
        }}
      >
        {title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mt: 1,
          color: colors.muted,
          lineHeight: 1.8,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}

export default function MLInsightsPage() {
  const navigate = useNavigate();

  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        bgcolor: colors.background,
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="xl">
        {/* HERO */}
        <MotionBox
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          sx={{
            pt: { xs: 5, md: 9 },
            pb: { xs: 6, md: 9 },
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mb: 2.5 }}
          >
            <AutoAwesomeRounded sx={{ color: colors.purple, fontSize: 19 }} />

            <Typography
              variant="overline"
              sx={{
                fontWeight: 800,
                letterSpacing: 2,
                color: colors.purple,
              }}
            >
              MACHINE LEARNING CASE STUDY
            </Typography>
          </Stack>

          <Typography
            component="h1"
            sx={{
              maxWidth: 900,
              fontWeight: 800,
              fontSize: { xs: 43, sm: 58, md: 76 },
              lineHeight: 1.07,
              letterSpacing: "-0.065em",
              color: colors.ink,
            }}
          >
            From data to
            <Box component="span" sx={{ color: colors.purple }}>
              {" "}
              prediction.
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 3,
              color: colors.muted,
              fontSize: { xs: 15, md: 18 },
              lineHeight: 1.85,
              maxWidth: 700,
            }}
          >
            A closer look at how I prepared article data, explored patterns,
            trained a Linear Regression model, and integrated predictions into a
            Django API.
          </Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            useFlexGap
            gap={1}
            sx={{ mt: 4 }}
          >
            {["Python", "Pandas", "Scikit-learn", "Django REST API"].map(
              (technology) => (
                <Chip
                  key={technology}
                  label={technology}
                  sx={{
                    bgcolor: colors.lavender,
                    color: "#6F4F9B",
                    fontWeight: 700,
                    borderRadius: 2,
                  }}
                />
              ),
            )}
          </Stack>
        </MotionBox>

        {/* PROJECT OVERVIEW */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          sx={{
            mb: { xs: 7, md: 10 },
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            color: "#fff",
            background:
              "linear-gradient(125deg, #2D223E 0%, #4E386C 55%, #8060A8 100%)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 350,
              height: 350,
              right: -100,
              top: -140,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(222,194,255,0.20), transparent 70%)",
            }}
          />

          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            spacing={4}
            sx={{ position: "relative" }}
          >
            <Box sx={{ maxWidth: 680 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "#D7C3F1",
                  fontWeight: 800,
                  letterSpacing: 2,
                }}
              >
                THE PROJECT
              </Typography>

              <Typography
                sx={{
                  mt: 1,
                  fontSize: { xs: 29, md: 40 },
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                }}
              >
                Article Views Prediction
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  lineHeight: 1.85,
                  color: "rgba(255,255,255,0.77)",
                }}
              >
                The objective is to estimate how many views an article might
                receive using three inputs: word count, breaking-news status,
                and author experience.
              </Typography>
            </Box>

            <Button
              variant="contained"
              endIcon={<ArrowForwardRounded />}
              onClick={() => navigate("/ml-playground")}
              sx={{
                bgcolor: "#fff",
                color: colors.darkPurple,
                borderRadius: 2.5,
                px: 3,
                py: 1.6,
                fontWeight: 750,
                textTransform: "none",
                whiteSpace: "nowrap",
                "&:hover": { bgcolor: "#F0E8FA" },
              }}
            >
              Try the Live Model
            </Button>
          </Stack>
        </MotionBox>

        {/* PROCESS INTRO */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="overline"
            sx={{
              color: colors.purple,
              fontWeight: 800,
              letterSpacing: 2,
            }}
          >
            THE WORKFLOW
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: { xs: 32, md: 46 },
              fontWeight: 800,
              letterSpacing: "-0.055em",
              color: colors.ink,
            }}
          >
            Building the model
          </Typography>

          <Typography
            sx={{
              mt: 1.5,
              maxWidth: 650,
              color: colors.muted,
              lineHeight: 1.8,
            }}
          >
            Six stages, from the original dataset to predictions served through
            the application.
          </Typography>
        </Box>

        {/* TIMELINE */}
        <Box sx={{ maxWidth: 1100, ml: { xs: 1, md: 2 } }}>
          {/* STEP 1 */}
          <TimelineSection
            number="01"
            icon={<PsychologyRounded />}
            title="Defining the Goal"
            description="The project begins with a regression problem: estimating an article's expected number of views."
          >
            <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
              <InfoCard
                label="INPUT"
                title="Article Features"
                description="Information about the article and its author."
              />

              <InfoCard
                label="OUTPUT"
                title="Predicted Views"
                description="A numerical estimate of how many views the article may receive."
              />
            </Stack>
          </TimelineSection>

          {/* STEP 2 */}
          <TimelineSection
            number="02"
            icon={<DataObjectRounded />}
            title="Preparing the Data"
            description="Article information was loaded from a JSON dataset and transformed into a Pandas DataFrame for analysis."
          >
            <CodePanel code={preparationCode} filename="data_preparation.py" />
          </TimelineSection>

          {/* STEP 3 */}
          <TimelineSection
            number="03"
            icon={<AutoGraphRounded />}
            title="Exploring the Features"
            description="Exploratory data analysis included a correlation matrix and heatmap to investigate relationships between the available features and article views."
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(3, minmax(0, 1fr))",
                },
                gap: 2,
              }}
            >
              {features.map((feature) => (
                <Box
                  key={feature.title}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: `1px solid ${colors.border}`,
                    bgcolor: "#FAF8FD",
                  }}
                >
                  <Typography
                    sx={{
                      color: colors.purple,
                      fontSize: 13,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                    }}
                  >
                    {feature.number}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 2,
                      fontSize: 18,
                      fontWeight: 800,
                      color: colors.ink,
                    }}
                  >
                    {feature.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: colors.muted,
                      lineHeight: 1.8,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </TimelineSection>

          {/* STEP 4 */}
          <TimelineSection
            number="04"
            icon={<TrendingUpRounded />}
            title="Training the Model"
            description="Linear Regression was selected to predict a continuous numerical target: article views."
          >
            <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
              <Box
                sx={{
                  flex: 1,
                  bgcolor: colors.lavender,
                  p: 3,
                  borderRadius: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 48,
                    fontWeight: 800,
                    letterSpacing: "-0.06em",
                    color: colors.purple,
                  }}
                >
                  80%
                </Typography>

                <Typography sx={{ fontWeight: 800 }}>Training Set</Typography>

                <Typography
                  variant="body2"
                  sx={{ color: colors.muted, mt: 0.5 }}
                >
                  Used to fit the model.
                </Typography>
              </Box>

              <Box
                sx={{
                  flex: 1,
                  bgcolor: "#F5F4F8",
                  p: 3,
                  borderRadius: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 48,
                    fontWeight: 800,
                    letterSpacing: "-0.06em",
                    color: colors.darkPurple,
                  }}
                >
                  20%
                </Typography>

                <Typography sx={{ fontWeight: 800 }}>Testing Set</Typography>

                <Typography
                  variant="body2"
                  sx={{ color: colors.muted, mt: 0.5 }}
                >
                  Used to evaluate predictions.
                </Typography>
              </Box>
            </Stack>

            <CodePanel code={trainingCode} filename="training.py" />
          </TimelineSection>

          {/* STEP 5 */}
          <TimelineSection
            number="05"
            icon={<CheckCircleOutlineRounded />}
            title="Evaluating Performance"
            description="The model's predictions were compared with actual article views using two regression evaluation metrics."
          >
            <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
              <InfoCard
                label="MAE"
                title="Mean Absolute Error"
                description="Measures the average absolute difference between predicted and actual views."
              />

              <InfoCard
                label="R²"
                title="Coefficient of Determination"
                description="Describes how much variation in the target is explained by the model."
              />
            </Stack>

            <CodePanel code={evaluationCode} filename="evaluation.py" />

            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: colors.muted,
                lineHeight: 1.8,
              }}
            >
              The actual MAE and R² values are not displayed here because they
              have not been supplied to this page.
            </Typography>
          </TimelineSection>

          {/* STEP 6 */}
          <TimelineSection
            number="06"
            icon={<SaveRounded />}
            title="Saving & Integrating"
            description="The trained model and its feature configuration were saved as PKL files and connected to the Django backend."
          >
            <CodePanel code={savingCode} filename="model_export.py" />

            <Box
              sx={{
                mt: 3,
                p: 3,
                bgcolor: "#F0EAF8",
                border: "1px solid #DDD1EB",
                borderRadius: 3,
              }}
            >
              <Stack direction="row" spacing={1.5} alignItems="start">
                <CheckCircleOutlineRounded
                  sx={{ color: colors.purple, mt: 0.3 }}
                />

                <Box>
                  <Typography
                    sx={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: colors.ink,
                    }}
                  >
                    From notebook to application
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: colors.muted,
                      lineHeight: 1.8,
                    }}
                  >
                    The React frontend sends article features to the Django API,
                    where the saved model generates an estimated view count.
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </TimelineSection>
        </Box>

        {/* FINAL CTA */}
        <MotionBox
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          sx={{
            mt: { xs: 5, md: 8 },
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            bgcolor: "#F1ECF8",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
            gap={4}
          >
            <Box sx={{ maxWidth: 700 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <ScienceRounded sx={{ color: colors.purple }} />

                <Typography
                  variant="overline"
                  sx={{
                    color: colors.purple,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                  }}
                >
                  WHAT'S NEXT?
                </Typography>
              </Stack>

              <Typography
                sx={{
                  mt: 1.5,
                  fontSize: { xs: 28, md: 38 },
                  fontWeight: 800,
                  color: colors.ink,
                  letterSpacing: "-0.05em",
                }}
              >
                Explore the model yourself.
              </Typography>

              <Typography
                sx={{
                  mt: 1.5,
                  color: colors.muted,
                  lineHeight: 1.8,
                }}
              >
                Experiment with different article lengths, author experience
                levels, and breaking-news settings to see how the estimated
                views change.
              </Typography>
            </Box>

            <Button
              variant="contained"
              endIcon={<ArrowForwardRounded />}
              onClick={() => navigate("/ml-playground")}
              sx={{
                bgcolor: colors.darkPurple,
                borderRadius: 2.5,
                px: 3,
                py: 1.6,
                fontWeight: 750,
                textTransform: "none",
                whiteSpace: "nowrap",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: colors.purple,
                  boxShadow: "none",
                },
              }}
            >
              Open ML Playground
            </Button>
          </Stack>
        </MotionBox>
      </Container>
    </Box>
  );
}
