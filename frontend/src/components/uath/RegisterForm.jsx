import { Grid, TextField } from "@mui/material";
import Form from "../form/Form";
import { useState } from "react";
import useForm from "../../hooks/useForm";
import User from "../../models/User";

function RegisterForm() {
  const { handleChange, handleSubmit, errors, formDetails } = useForm(
    initialValues,
    User,
  );
  return (
    <Form onSubmit={handleSubmit}>
      <Grid item xs={12} md={6}>
        <TextField
          label="First name"
          name="firstName"
          value={formDetails.firstName}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName}
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
