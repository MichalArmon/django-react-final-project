import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";

Container;
async function fetchArticles() {
  const response = await fetch("http://localhost:8000/api/articles/");
  if (!response.ok) {
    throw new Error(`error ${response.status}`);
  }
  const articles = await response.json();
  console.log(articles);
  return articles;
}

function Main() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function loadArticles() {
      const data = await fetchArticles();
      setArticles(data);
    }
    loadArticles();
  }, []);

  return (
    <Container>
      {articles.map((article) => (
        <ArticleCard article={article} />
      ))}
    </Container>
  );
}

export default Main;
