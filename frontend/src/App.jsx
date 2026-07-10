import ArticlesPage from "./components/articles/ArticlesPage";
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
      </Route>
    </Routes>
  );
}

export default App;
