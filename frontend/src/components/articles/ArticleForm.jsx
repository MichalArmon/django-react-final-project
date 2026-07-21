import { Button, Grid, TextField, Typography } from "@mui/material";
import Form from "../form/Form";
import { useState } from "react";
import useForm from "../../hooks/useForm";

import initialUserData from "../../initialData/initialUserData";
import { useUser } from "../../providers/UserProvider";
import { Link } from "react-router-dom";

import { articleSchema } from "../../models/Article";
import initialDataArticle from "../../initialData/initialDataArticle";

function ArticleForm() {
  const { handleSubmitCreateUser } = useUser();
  const { handleChange, handleSubmit, errors, formDetails } = useForm(
    initialDataArticle,
    articleSchema,
    handleSubmitCreateUser,
  );
  return (
    <>
      <Form onSubmit={handleSubmit} title="Write Article">
        <Grid item xs={12} md={12}>
          <TextField
            label="Title"
            name="title"
            value={formDetails.title}
            fullWidth
            onChange={handleChange}
            error={Boolean(errors.title)}
            helperText={errors.title}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            label="Content"
            name="content"
            value={formDetails.content}
            fullWidth
            onChange={handleChange}
            error={Boolean(errors.content)}
            helperText={errors.content}
          />
        </Grid>
      </Form>
    </>
  );
}

export default ArticleForm;
