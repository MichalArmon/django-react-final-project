import ArticleForm from "./components/articles/ArticleForm";
import ArticlesPage from "./components/articles/ArticlesPage";
import MyArticlesPage from "./components/articles/MyArticlesPage";
import LoginForm from "./components/uath/LoginForm";
import RegisterForm from "./components/uath/RegisterForm";

import Layout from "./layout/Layout";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ArticlesPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/my_articles" element={<MyArticlesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
