import { Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function SignAndLogButton() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <Box sx={{}}>
      <Typography
        variant="body2"
        align="center"
        sx={{
          mt: 2,
          color: "text.secondary",
        }}
      >
        {isLoginPage ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          component={Link}
          to={isLoginPage ? "/register" : "/login"}
          underline="hover"
          sx={{
            fontWeight: 600,
            color: "primary.main",
          }}
        >
          {isLoginPage ? "Register here" : "Login"}
        </Link>
      </Typography>
    </Box>
  );
}

export default SignAndLogButton;
