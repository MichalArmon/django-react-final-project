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
    <Container sx={{ height: "1500px" }}>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.author_username}</p>
          <p>{article.content}</p>
          {/* <p>{book.price}</p> */}
        </div>
      ))}
    </Container>
  );
}

export default Main;
