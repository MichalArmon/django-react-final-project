import ArticleForm from "./components/articles/ArticleForm";
import ArticlePage from "./components/articles/ArticlePage";
import MyArticlesPage from "./components/articles/MyArticlesPage";

import ArticlesPage from "./components/articles/ArticlesPage";
import CreateArticle from "./components/articles/CreateArticle";
import LoginForm from "./components/uath/LoginForm";
import RegisterForm from "./components/uath/RegisterForm";

import Layout from "./layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";
import EditArticle from "./components/articles/EditArticle";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticlesPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/my_articles" element={<MyArticlesPage />} />
        <Route path="/my_articles/create" element={<CreateArticle />} />
        <Route path="/articles/:articleId" element={<ArticlePage />} />
        <Route path="/articles/:articleId/edit" element={<EditArticle />} />
      </Route>
    </Routes>
  );
}

export default App;
