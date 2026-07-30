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
import SnackbarProvider from "./providers/SnackBarProvider.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <UserProvider>
            <ArticleProvider>
              <CommentProvider>
                <ScrollToTop />
                <App />
              </CommentProvider>
            </ArticleProvider>
          </UserProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
