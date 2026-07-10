import { LoopOutlined } from "@mui/icons-material";
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
import FormButton from "./FormButton";

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
        {title}
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
      <Grid container spacing={spacing} my={2}>
        <Grid item xs={12} sm={6}>
          <FormButton
            node="cancel"
            color="error"
            variant="outlined"
            onClick={() => navigate(to)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormButton
            node={<LoopOutlined />}
            variant="outlined"
            onClick={onReset}
          />
        </Grid>
        <Grid item xs={12} my={2}>
          <FormButton
            node="Submit"
            onClick={onSubmit}
            size="large"
            styles={{ py: 2 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Form;
