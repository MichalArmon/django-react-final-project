import {
  Grid,
  Button,
  Box,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
} from "@mui/material";

function RegisterForm() {
  return (
    <Box sx={{ width: "100%" }}>
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField label="First name" fullWidth />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="Last name" fullWidth />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="Email" fullWidth />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="Password" type="password" fullWidth />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button variant="contained" size="large" fullWidth>
            register
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default RegisterForm;
