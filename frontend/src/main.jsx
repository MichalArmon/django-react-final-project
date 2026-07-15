import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme.js";
UserProvider;
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./providers/UserProvider.jsx";
import ArticleProvider from "./providers/ArticleProvider.jsx";
import CommentProvider from "./providers/CommentProvider.jsx";

BrowserRouter;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <ArticleProvider>
            <CommentProvider>
              <App />
            </CommentProvider>
          </ArticleProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
