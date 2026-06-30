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
  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Form onSubmit={handleSignUp}>
      <Grid item xs={12} md={6}>
        <TextField
          label="First name"
          name="firstName"
          value={userDetails.firstName}
          fullWidth
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Last name"
          name="lastName"
          fullWidth
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Password"
          type="password"
          name="password"
          fullWidth
          onChange={handleChange}
        />
      </Grid>
    </Form>
  );
}

export default RegisterForm;
