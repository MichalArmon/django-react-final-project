import {
  Grid,
  Button,
  Box,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Form({
  title = "",
  onSubmit,
  onReset,
  to = "/",
  color = "inherit",
  spacing = 1,
  styles = {},
  children,
}) {
  const navigate = useNavigate();
  return (
    <Box
      component="form"
      color={color}
      sx={{ width: "100%", mt: 2, p: { xs: 1, sm: 2 }, ...styles }}
      onSubmit={onSubmit}
      autoComplete="off"
      noValidate
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          mb: 1,
          color: "text.primary",
        }}
      >
        Register
      </Typography>

      <Typography
        sx={{
          color: "text.secondary",
          mb: 4,
        }}
      >
        Discover the newest stories, insights and updates.
      </Typography>
      <Grid container spacing={spacing}>
        {children}
      </Grid>
      <Grid container spacing={1} my={2} direction="row" width="100%">
        <Grid item xs={12} sm={6}>
          {" "}
          <Button
            node="cencel"
            color="error"
            component="div"
            variant="outlined"
            onClick={() => navigate(to)}
          ></Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Form;
