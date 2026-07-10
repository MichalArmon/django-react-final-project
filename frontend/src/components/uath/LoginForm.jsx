import { Grid, TextField } from "@mui/material";
import Form from "../form/Form";
import { useState } from "react";
import useForm from "../../hooks/useForm";

import { useUser } from "../../providers/UserProvider";
import Login from "../../models/Login";
import loginInitialUserData from "../../initialData/loginInitialUserData";
import SignAndLogButton from "./SignAndLogButton";

function LoginForm() {
  const { handleSubmitLoginUser } = useUser();
  const { handleChange, handleSubmit, errors, formDetails } = useForm(
    loginInitialUserData,
    Login,
    handleSubmitLoginUser,
  );
  return (
    <>
      <Form onSubmit={handleSubmit} title="Login">
        <Grid item xs={12}>
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
        <Grid item xs={12}>
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
      </Form>
      <SignAndLogButton />
    </>
  );
}

export default LoginForm;
