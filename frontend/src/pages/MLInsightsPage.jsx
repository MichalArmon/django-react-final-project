import {
  AutoGraph,
  CheckCircleOutline,
  DataObject,
  Psychology,
  Save,
  Science,
  TrendingUp,
} from "@mui/icons-material";

import {
  Box,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const CodeBlock = ({ children }) => {
  return (
    <Box
      component="pre"
      sx={{
        m: 0,
        mt: 2,
        p: 2,
        overflowX: "auto",
        borderRadius: 2,
        bgcolor: "#1e1e1e",
        color: "#f5f5f5",
        fontFamily: `"Fira Code", "Courier New", monospace`,
        fontSize: "0.9rem",
        lineHeight: 1.7,
        whiteSpace: "pre-wrap",
      }}
    >
      {children}
    </Box>
  );
};

const NotebookSection = ({ number, icon, title, description, children }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        mb: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          p: { xs: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            minWidth: 44,
            height: 44,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          {icon}
        </Box>

        <Box sx={{ flex: 1 }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Chip label={`Step ${number}`} size="small" variant="outlined" />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
              }}
            >
              {title}
            </Typography>
          </Stack>

          <Typography
            sx={{
              mt: 1,
              color: "text.secondary",
              lineHeight: 1.8,
            }}
          >
            {description}
          </Typography>

          {children}
        </Box>
      </Box>
    </Paper>
  );
};

function MLInsightsPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        // bgcolor: "background.default",
        py: { xs: 4, md: 7 },
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
            borderRadius: 4,
            color: "white",
            background:
              "linear-gradient(135deg, #3158d4 0%, #663bb7 55%, #9a3ba7 100%)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.08)",
              top: -80,
              right: -50,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 130,
              height: 130,
              borderRadius: "50%",
              bgcolor: "rgba(255,255,255,0.06)",
              bottom: -50,
              left: 80,
            }}
          />

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Chip
              icon={<Science />}
              label="Machine Learning Project"
              sx={{
                mb: 2,
                bgcolor: "rgba(255,255,255,0.15)",
                color: "white",

                "& .MuiChip-icon": {
                  color: "white",
                },
              }}
            />

            <Typography
              variant="h3"
              sx={{
                maxWidth: 760,
                fontWeight: 900,
                fontSize: {
                  xs: "2rem",
                  md: "3.2rem",
                },
                mx: "auto",
              }}
            >
              Article Views Prediction
            </Typography>

            <Typography
              sx={{
                mx: "auto",
                mt: 2,
                maxWidth: 720,
                fontSize: {
                  xs: "1rem",
                  md: "1.15rem",
                },
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.88)",
              }}
            >
              A machine learning model that predicts the expected number of
              views for an article based on its content and author information.
            </Typography>

            <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 3 }}>
              <Chip
                label="Python"
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              />

              <Chip
                label="Pandas"
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              />

              <Chip
                label="Scikit-learn"
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              />

              <Chip
                label="Django REST API"
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  color: "white",
                }}
              />
            </Stack>
          </Box>
        </Paper>

        <NotebookSection
          number="01"
          icon={<Psychology />}
          title="The Goal"
          description="The purpose of the project is to predict how many views an article may receive."
        >
          <Box
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: "action.hover",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Model input</Typography>

            <Typography color="text.secondary">
              Article information and author experience.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography sx={{ fontWeight: 700 }}>Model output</Typography>

            <Typography color="text.secondary">
              Predicted number of article views.
            </Typography>
          </Box>
        </NotebookSection>

        <NotebookSection
          number="02"
          icon={<DataObject />}
          title="Loading and Preparing the Data"
          description="The information was loaded from a JSON file and converted into a Pandas DataFrame."
        >
          <CodeBlock>
            {`with open("articals.json", "r", encoding="utf-8") as file:
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
        "views": article["views"]
    }

    rows.append(row)

articles_df = pd.DataFrame(rows)`}
          </CodeBlock>
        </NotebookSection>

        <NotebookSection
          number="03"
          icon={<AutoGraph />}
          title="Exploratory Data Analysis"
          description="A correlation matrix and heatmap were created to examine which features are connected to article views."
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            {[
              {
                title: "Word Count",
                text: "The number of words in the article.",
              },
              {
                title: "Breaking News",
                text: "Whether the article is marked as breaking news.",
              },
              {
                title: "Author Experience",
                text: "The author's years of professional experience.",
              },
            ].map((feature) => (
              <Paper
                key={feature.title}
                elevation={0}
                sx={{
                  flex: 1,
                  p: 2,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Typography sx={{ fontWeight: 800 }}>
                  {feature.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, lineHeight: 1.7 }}
                >
                  {feature.text}
                </Typography>
              </Paper>
            ))}
          </Stack>
        </NotebookSection>

        <NotebookSection
          number="04"
          icon={<TrendingUp />}
          title="Training the Model"
          description="The selected algorithm was Linear Regression because the target is a continuous numerical value."
        >
          <CodeBlock>
            {`X = articles_df[
    [
        "word_count",
        "is_breaking_news",
        "author_experience_years"
    ]
]

y = articles_df["views"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

model = LinearRegression()
model.fit(X_train, y_train)`}
          </CodeBlock>

          <Box
            sx={{
              mt: 2,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 2,
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h4"
                color="primary.main"
                sx={{ fontWeight: 900 }}
              >
                80%
              </Typography>

              <Typography sx={{ fontWeight: 700 }}>Training data</Typography>

              <Typography variant="body2" color="text.secondary">
                Used to teach the model.
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography
                variant="h4"
                color="secondary.main"
                sx={{ fontWeight: 900 }}
              >
                20%
              </Typography>

              <Typography sx={{ fontWeight: 700 }}>Testing data</Typography>

              <Typography variant="body2" color="text.secondary">
                Used to evaluate new predictions.
              </Typography>
            </Paper>
          </Box>
        </NotebookSection>

        <NotebookSection
          number="05"
          icon={<CheckCircleOutline />}
          title="Model Evaluation"
          description="The predictions were compared with the actual number of views using MAE and R²."
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="overline" color="text.secondary">
                MAE
              </Typography>

              <Typography variant="h5" sx={{ mt: 1, fontWeight: 900 }}>
                Mean Absolute Error
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1, lineHeight: 1.8 }}
              >
                Shows the average difference between the model's prediction and
                the actual number of views.
              </Typography>
            </Paper>

            <Paper
              elevation={0}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="overline" color="text.secondary">
                R²
              </Typography>

              <Typography variant="h5" sx={{ mt: 1, fontWeight: 900 }}>
                Coefficient of Determination
              </Typography>

              <Typography
                color="text.secondary"
                sx={{ mt: 1, lineHeight: 1.8 }}
              >
                Shows how much of the variation in article views is explained by
                the model.
              </Typography>
            </Paper>
          </Stack>

          <CodeBlock>
            {`predictions = model.predict(X_test)

mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("MAE:", mae)
print("R²:", r2)`}
          </CodeBlock>
        </NotebookSection>

        <NotebookSection
          number="06"
          icon={<Save />}
          title="Saving and Using the Model"
          description="The trained model was saved as a PKL file and connected to the Django backend."
        >
          <CodeBlock>
            {`joblib.dump(
    model,
    "article_views_model.pkl"
)

joblib.dump(
    feature_columns,
    "article_views_features.pkl"
)`}
          </CodeBlock>

          <Box
            sx={{
              mt: 2,
              p: 3,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "success.main",
              bgcolor: "success.main",
              color: "success.contrastText",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              Final Result
            </Typography>

            <Typography sx={{ mt: 1, lineHeight: 1.8 }}>
              The application can send article information to the Django API and
              receive a prediction for the expected number of views.
            </Typography>
          </Box>
        </NotebookSection>

        <Paper
          elevation={0}
          sx={{
            mt: 4,
            p: { xs: 3, md: 4 },
            borderRadius: 4,
            textAlign: "center",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            Future Improvements
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              mt: 1,
              maxWidth: 700,
              mx: "auto",
              lineHeight: 1.8,
            }}
          >
            The model can be improved by adding more articles, additional
            features and more advanced machine learning algorithms.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default MLInsightsPage;
