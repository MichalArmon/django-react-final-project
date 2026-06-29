import { Grid, TextField } from "@mui/material";
import Form from "../form/Form";

function RegisterForm() {
  return (
    <Form>
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
    </Form>
  );
}

export default RegisterForm;
