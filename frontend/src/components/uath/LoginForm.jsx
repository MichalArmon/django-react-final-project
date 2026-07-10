import { Grid, TextField } from "@mui/material";
import Form from "../form/Form";
import { useState } from "react";
import useForm from "../../hooks/useForm";

import { useUser } from "../../providers/UserProvider";
import Login from "../../models/Login";
import loginInitialUserData from "../../initialData/loginInitialUserData";

function LoginForm() {
  const { handleSubmitCreateUser } = useUser();
  const { handleChange, handleSubmit, errors, formDetails } = useForm(
    loginInitialUserData,
    Login,
    handleSubmitCreateUser,
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
          value={formDetails.lastName}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Email"
          name="email"
          type="email"
          onChange={handleChange}
          fullWidth
          value={formDetails.email}
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Password"
          type="password"
          name="password"
          fullWidth
          onChange={handleChange}
          value={formDetails.password}
          error={Boolean(errors.password)}
          helperText={errors.password}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Bio"
          name="bio"
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.bio)}
          helperText={errors.bio}
          value={formDetails.bio}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="City"
          name="city"
          fullWidth
          onChange={handleChange}
          value={formDetails.city}
          error={Boolean(errors.city)}
          helperText={errors.city}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          label="Age"
          name="age"
          type="number"
          value={formDetails.age}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.age)}
          helperText={errors.age}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Experience years"
          name="experience_years"
          value={formDetails.experience_years}
          type="number"
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.experience_years)}
          helperText={errors.experience_years}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Role"
          name="role"
          value={formDetails.role}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.role)}
          helperText={errors.role}
        />
      </Grid>
    </Form>
  );
}

export default LoginForm;
