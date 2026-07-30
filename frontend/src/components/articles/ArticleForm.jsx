import { Button, Grid, TextField, Typography } from "@mui/material";
import Form from "../form/Form";
import { useState } from "react";
import useForm from "../../hooks/useForm";

import { useUser } from "../../providers/UserProvider";
import { Link } from "react-router-dom";

import { articleSchema } from "../../models/Article";

import { useArticle } from "../../providers/ArticleProvider";

function ArticleForm({ handleSubmitArticle, initialDataArticle, title }) {
  const { handleChange, handleSubmit, errors, formDetails, handleReset } =
    useForm(initialDataArticle, articleSchema, handleSubmitArticle);
  return (
    <>
      <Form onSubmit={handleSubmit} title={title} onReset={handleReset}>
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
            multiline
            rows={6}
          />
        </Grid>
      </Form>
    </>
  );
}

export default ArticleForm;
