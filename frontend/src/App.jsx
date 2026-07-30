import ArticlePage from "./components/articles/ArticlePage";
import MyArticlesPage from "./components/articles/MyArticlesPage";

import ArticlesPage from "./components/articles/ArticlesPage";
import CreateArticle from "./components/articles/CreateArticle";
import LoginForm from "./components/uath/LoginForm";
import RegisterForm from "./components/uath/RegisterForm";

import Layout from "./layout/Layout";
import { Routes, Route } from "react-router-dom";
import EditArticle from "./components/articles/EditArticle";
import UsersAdminPage from "./components/admin/UsersAdminPage";
import EditUserForm from "./components/uath/EditUserForm";

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
        <Route path="/admin/users" element={<UsersAdminPage />} />
        <Route path="/admin/users/:id/edit" element={<EditUserForm />} />
      </Route>
    </Routes>
  );
}

export default App;
