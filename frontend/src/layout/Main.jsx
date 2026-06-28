import { Container, Box } from "@mui/material";

import ArticlesPage from "../components/articles/ArticlesPage";

function Main() {
  return (
    <Container>
      <Box sx={{ mt: 10 }}>
        <ArticlesPage />
      </Box>
    </Container>
  );
}

export default Main;
