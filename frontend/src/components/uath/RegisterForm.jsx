import { Grid, TextField } from "@mui/material";
import Form from "../form/Form";
import { useState } from "react";

function RegisterForm() {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
  });
  const handleSignUp = () => {
    console.log(userDetails);
  };
  return (
    <Form onSubmit={handleSignUp}>
      <Grid item xs={12} md={6}>
        <TextField
          label="First name"
          fullWidth
          onChange={(e) => {
            setUserDetails((prev) => ({ ...prev, firstName: e.target.value }));
            console.log(e.target.value);
          }}
        />
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
