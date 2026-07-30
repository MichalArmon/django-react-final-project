import { Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <Container>
      <Box
        sx={{
          mt: {
            xs: 16,
            md: 10,
          },
        }}
      >
        <Outlet />
      </Box>
    </Container>
  );
}

export default Main;
