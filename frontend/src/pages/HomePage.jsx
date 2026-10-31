import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
  Avatar,
  CircularProgress,
} from "@mui/material";

import {
  ArrowForwardRounded,
  AutoAwesomeRounded,
  TrendingUpRounded,
  VisibilityOutlined,
  FavoriteBorderRounded,
  AccessTimeRounded,
} from "@mui/icons-material";

import { useArticle } from "../providers/ArticleProvider";

const MotionBox = motion.create(Box);

// Images by topic
const images = {
  technology:
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=85",
  education:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=85",
  health:
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=85",
  finance:
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=85",
  politics:
    "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&q=85",
  sports:
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&q=85",
  default:
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=85",
};

function getTopic(article) {
  const tags = (article.tags || [])
    .map((tag) => (typeof tag === "string" ? tag : tag.name || ""))
    .join(" ")
    .toLowerCase();

  const text = `${article.title || ""} ${tags}`.toLowerCase();

  const topics = {
    technology: ["technology", "tech", "ai", "software", "programming"],
    education: ["education", "student", "learning", "school"],
    health: ["health", "medical", "hospital", "doctor"],
    finance: ["finance", "market", "economic", "business", "stock"],
    politics: ["politics", "government", "election", "policy"],
    sports: ["sports", "football", "team", "championship"],
  };

  for (const [topic, words] of Object.entries(topics)) {
    if (words.some((word) => text.includes(word))) {
      return topic;
    }
  }

  return "default";
}

function getImage(article) {
  return images[getTopic(article)];
}

function cleanTitle(title = "") {
  return title.split("#")[0].trim();
}

function formatNumber(number = 0) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(number);
}

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function ArticleImage({ article, height = 220 }) {
  const [failed, setFailed] = useState(false);

  return (
    <Box
      sx={{
        height,
        overflow: "hidden",
        bgcolor: "#EAE6F4",
        background: "linear-gradient(135deg, #EEE8F8, #D4CAE9)",
      }}
    >
      {!failed && (
        <Box
          component="img"
          src={getImage(article)}
          alt={cleanTitle(article.title)}
          loading="lazy"
          onError={() => setFailed(true)}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.6s ease",
          }}
        />
      )}
    </Box>
  );
}

function ArticleMeta({ article, light = false }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      flexWrap="wrap"
      useFlexGap
      sx={{
        color: light ? "rgba(255,255,255,0.8)" : "text.secondary",
      }}
    >
      <Stack direction="row" spacing={0.5} alignItems="center">
        <VisibilityOutlined sx={{ fontSize: 16 }} />
        <Typography variant="caption">{formatNumber(article.views)}</Typography>
      </Stack>

      <Stack direction="row" spacing={0.5} alignItems="center">
        <FavoriteBorderRounded sx={{ fontSize: 16 }} />
        <Typography variant="caption">{formatNumber(article.likes)}</Typography>
      </Stack>

      <Stack direction="row" spacing={0.5} alignItems="center">
        <AccessTimeRounded sx={{ fontSize: 16 }} />
        <Typography variant="caption">
          {Math.max(1, Math.ceil((article.word_count || 0) / 200))} min
        </Typography>
      </Stack>
    </Stack>
  );
}

function SmallArticleCard({ article, index }) {
  const navigate = useNavigate();

  return (
    <MotionBox
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onClick={() => navigate(`/articles/${article.id}`)}
      sx={{
        bgcolor: "#fff",
        border: "1px solid #EBEAF0",
        borderRadius: 3,
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 18px 45px rgba(26,20,52,0.10)",
        },
        "&:hover img": {
          transform: "scale(1.06)",
        },
      }}
    >
      <ArticleImage article={article} height={205} />

      <Stack spacing={2} sx={{ p: 2.5, flex: 1 }}>
        <Stack direction="row" justifyContent="space-between">
          <Chip
            label={getTopic(article).toUpperCase()}
            size="small"
            sx={{
              bgcolor: "#F0EAF9",
              color: "#7452A5",
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 0.7,
            }}
          />

          <Typography variant="caption" color="text.secondary">
            {formatDate(article.published_at)}
          </Typography>
        </Stack>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 750,
            lineHeight: 1.35,
            letterSpacing: "-0.03em",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {cleanTitle(article.title)}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            lineHeight: 1.8,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
            flex: 1,
          }}
        >
          {article.content}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            sx={{
              width: 27,
              height: 27,
              bgcolor: "#EAE0F5",
              color: "#684B91",
              fontSize: 12,
            }}
          >
            {article.author_username?.[0]?.toUpperCase() || "A"}
          </Avatar>

          <Typography variant="caption" fontWeight={600}>
            {article.author_username || "Author"}
          </Typography>
        </Stack>

        <Box sx={{ borderTop: "1px solid #F0EEF4", pt: 1.5 }}>
          <ArticleMeta article={article} />
        </Box>
      </Stack>
    </MotionBox>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { handleGetAllArticles } = useArticle();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadArticles() {
      try {
        const results = await handleGetAllArticles(1);

        if (mounted) {
          setArticles(results || []);
        }
      } catch (err) {
        console.error(err);

        if (mounted) setError(true);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadArticles();

    return () => {
      mounted = false;
    };
  }, []);

  const featured = articles[0];

  // Popular among the articles loaded on this page
  const trending = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);

  const latest = articles.slice(1, 7);

  if (loading) {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "70vh" }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  if (error || !featured) {
    return (
      <Container sx={{ py: 12, textAlign: "center" }}>
        <Typography variant="h5">
          {error ? "Unable to load articles." : "No articles yet."}
        </Typography>

        <Button sx={{ mt: 3 }} onClick={() => navigate("/articles")}>
          Browse Articles
        </Button>
      </Container>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        bgcolor: "#FCFBFD",
        minHeight: "100vh",
        color: "#201D2A",
        pb: 12,
      }}
    >
      <Container maxWidth="xl" sx={{ pt: { xs: 5, md: 9 } }}>
        {/* INTRO */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ mb: 6 }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <AutoAwesomeRounded sx={{ fontSize: 18, color: "#8D66C3" }} />

            <Typography
              variant="overline"
              sx={{
                fontWeight: 800,
                letterSpacing: 2,
                color: "#8D66C3",
              }}
            >
              IDEAS WORTH EXPLORING
            </Typography>
          </Stack>

          <Typography
            component="h1"
            sx={{
              fontSize: { xs: 44, md: 72 },
              fontWeight: 800,
              letterSpacing: "-0.065em",
              lineHeight: 1.05,
              maxWidth: 850,
            }}
          >
            Stories that shape
            <Box component="span" sx={{ color: "#8D66C3" }}>
              {" "}
              tomorrow.
            </Box>
          </Typography>

          <Typography
            sx={{
              mt: 2.5,
              maxWidth: 610,
              fontSize: { xs: 15, md: 18 },
              color: "#797486",
              lineHeight: 1.8,
            }}
          >
            Discover fresh perspectives, inspiring ideas, and the stories
            shaping our changing world.
          </Typography>
        </MotionBox>

        {/* FEATURED + TRENDING */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "minmax(0, 2fr) minmax(300px, 1fr)",
            },
            gap: 4,
            alignItems: "stretch",
          }}
        >
          {/* FEATURED STORY */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            onClick={() => navigate(`/articles/${featured.id}`)}
            sx={{
              position: "relative",
              minHeight: { xs: 460, md: 560 },
              overflow: "hidden",
              borderRadius: 4,
              cursor: "pointer",
              bgcolor: "#2D2442",
              "&:hover img": {
                transform: "scale(1.05)",
              },
            }}
          >
            <Box
              component="img"
              src={getImage(featured)}
              alt={cleanTitle(featured.title)}
              sx={{
                width: "100%",
                height: "100%",
                position: "absolute",
                inset: 0,
                objectFit: "cover",
                transition: "transform 0.8s ease",
              }}
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(0deg, rgba(18,13,32,0.96) 0%, rgba(18,13,32,0.42) 55%, rgba(18,13,32,0.12) 100%)",
              }}
            />

            <Stack
              justifyContent="flex-end"
              spacing={2.2}
              sx={{
                position: "relative",
                height: "100%",
                p: { xs: 3, md: 5 },
                color: "#fff",
              }}
            >
              <Chip
                icon={<AutoAwesomeRounded />}
                label="FEATURED STORY"
                sx={{
                  alignSelf: "flex-start",
                  bgcolor: "#fff",
                  color: "#5D3F88",
                  fontWeight: 800,
                  letterSpacing: 1,
                }}
              />

              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 30, md: 50 },
                  fontWeight: 800,
                  letterSpacing: "-0.055em",
                  lineHeight: 1.15,
                  maxWidth: 720,
                }}
              >
                {cleanTitle(featured.title)}
              </Typography>

              <Typography
                sx={{
                  color: "rgba(255,255,255,0.82)",
                  maxWidth: 600,
                  lineHeight: 1.7,
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                {featured.content}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                flexWrap="wrap"
                useFlexGap
                alignItems="center"
              >
                <Typography variant="body2" fontWeight={700}>
                  {featured.author_username}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {formatDate(featured.published_at)}
                </Typography>

                <ArticleMeta article={featured} light />
              </Stack>

              <Box sx={{ pt: 1 }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardRounded />}
                  sx={{
                    bgcolor: "#fff",
                    color: "#33244E",
                    borderRadius: 2,
                    px: 3,
                    py: 1.2,
                    textTransform: "none",
                    fontWeight: 750,
                    "&:hover": {
                      bgcolor: "#F1E9FC",
                    },
                  }}
                >
                  Read Article
                </Button>
              </Box>
            </Stack>
          </MotionBox>

          {/* TRENDING */}
          <Box
            sx={{
              border: "1px solid #ECE9F0",
              borderRadius: 4,
              bgcolor: "#fff",
              p: { xs: 3, md: 3.5 },
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <TrendingUpRounded sx={{ color: "#8963B8" }} />

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                }}
              >
                Trending Now
              </Typography>
            </Stack>

            <Stack spacing={0}>
              {trending.map((article, index) => (
                <Box
                  key={article.id}
                  onClick={() => navigate(`/articles/${article.id}`)}
                  sx={{
                    display: "flex",
                    gap: 2,
                    py: 2.5,
                    borderBottom:
                      index < trending.length - 1
                        ? "1px solid #F0EDF4"
                        : "none",
                    cursor: "pointer",
                    "&:hover .trending-title": {
                      color: "#8963B8",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 30,
                      fontWeight: 800,
                      lineHeight: 1,
                      color: "#D2C5E4",
                      minWidth: 32,
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </Typography>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      className="trending-title"
                      sx={{
                        fontWeight: 750,
                        fontSize: 15,
                        lineHeight: 1.45,
                        transition: "color 0.2s",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                      }}
                    >
                      {cleanTitle(article.title)}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        mt: 1,
                        color: "#918A9E",
                      }}
                    >
                      {formatDate(article.published_at)} ·{" "}
                      {formatNumber(article.views)} views
                    </Typography>
                  </Box>

                  <Box
                    component="img"
                    src={getImage(article)}
                    alt=""
                    loading="lazy"
                    sx={{
                      width: 76,
                      height: 72,
                      objectFit: "cover",
                      borderRadius: 2,
                      flexShrink: 0,
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* LATEST ARTICLES */}
        <Box sx={{ mt: { xs: 8, md: 12 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "flex-end" }}
            spacing={2}
            sx={{ mb: 4 }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{
                  fontWeight: 800,
                  letterSpacing: 2,
                  color: "#8D66C3",
                }}
              >
                FRESH FROM THE COMMUNITY
              </Typography>

              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 34, md: 48 },
                  fontWeight: 800,
                  letterSpacing: "-0.06em",
                }}
              >
                Latest Articles
              </Typography>
            </Box>

            <Button
              onClick={() => navigate("/articles")}
              endIcon={<ArrowForwardRounded />}
              sx={{
                color: "#68458E",
                textTransform: "none",
                fontWeight: 750,
              }}
            >
              View All Articles
            </Button>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(3, minmax(0, 1fr))",
              },
              gap: 3,
            }}
          >
            {latest.map((article, index) => (
              <SmallArticleCard
                key={article.id}
                article={article}
                index={index}
              />
            ))}
          </Box>
        </Box>

        {/* ML PROMO */}
        <MotionBox
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          sx={{
            mt: 10,
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            color: "#fff",
            background:
              "linear-gradient(120deg, #302144 0%, #60438D 55%, #9B74C6 100%)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{ color: "#D7C3F1", letterSpacing: 2 }}
            >
              MACHINE LEARNING
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 30, md: 43 },
                fontWeight: 800,
                letterSpacing: "-0.05em",
                lineHeight: 1.15,
                mt: 1,
              }}
            >
              Go beyond the headlines.
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color: "rgba(255,255,255,0.78)",
                maxWidth: 540,
                lineHeight: 1.8,
              }}
            >
              Explore article trends and experiment with machine learning
              predictions.
            </Typography>
          </Box>

          <Button
            variant="contained"
            endIcon={<ArrowForwardRounded />}
            onClick={() => navigate("/ml-playground")}
            sx={{
              bgcolor: "#fff",
              color: "#4F3472",
              whiteSpace: "nowrap",
              textTransform: "none",
              fontWeight: 750,
              px: 3,
              py: 1.5,
              borderRadius: 2,
              "&:hover": { bgcolor: "#EFE5FC" },
            }}
          >
            Explore ML Playground
          </Button>
        </MotionBox>
      </Container>
    </Box>
  );
}
