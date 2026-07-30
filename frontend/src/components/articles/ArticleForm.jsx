import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  TextField,
} from "@mui/material";

import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";

import Form from "../form/Form";
import useForm from "../../hooks/useForm";
import { articleSchema } from "../../models/Article";

const tagOptions = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Business" },
  { id: 3, name: "Health" },
  { id: 4, name: "Education" },
  { id: 5, name: "Travel" },
  { id: 6, name: "Finance" },
  { id: 7, name: "Sports" },
  { id: 8, name: "Entertainment" },
];

function ArticleForm({ handleSubmitArticle, initialDataArticle, title }) {
  const { handleChange, handleSubmit, errors, formDetails, handleReset } =
    useForm(initialDataArticle, articleSchema, handleSubmitArticle);

  const handleTagToggle = (tagId) => {
    const currentTags = formDetails.tags || [];

    const updatedTags = currentTags.includes(tagId)
      ? currentTags.filter((currentTagId) => currentTagId !== tagId)
      : [...currentTags, tagId];

    handleChange({
      target: {
        name: "tags",
        value: updatedTags,
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit} title={title} onReset={handleReset}>
      <Grid item xs={12}>
        <TextField
          label="Title"
          name="title"
          value={formDetails.title || ""}
          fullWidth
          onChange={handleChange}
          error={Boolean(errors.title)}
          helperText={errors.title}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Content"
          name="content"
          value={formDetails.content || ""}
          fullWidth
          multiline
          rows={6}
          onChange={handleChange}
          error={Boolean(errors.content)}
          helperText={errors.content}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth error={Boolean(errors.tags)}>
          <FormLabel
            sx={{
              mb: 1.5,
              fontWeight: 700,
              color: errors.tags ? "error.main" : "text.primary",
            }}
          >
            Tags
          </FormLabel>

          <Paper
            elevation={0}
            sx={{
              p: 2,
              border: "1px solid",
              borderColor: errors.tags ? "error.main" : "divider",
              borderRadius: 2,
            }}
          >
            <FormGroup
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 0.5,
              }}
            >
              {tagOptions.map((tag) => {
                const isSelected = (formDetails.tags || []).includes(tag.id);

                return (
                  <FormControlLabel
                    key={tag.id}
                    label={tag.name}
                    control={
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleTagToggle(tag.id)}
                        icon={<RadioButtonUnchecked />}
                        checkedIcon={<CheckCircle />}
                        sx={{
                          color: "text.secondary",

                          "&.Mui-checked": {
                            color: "primary.main",
                          },
                        }}
                      />
                    }
                  />
                );
              })}
            </FormGroup>
          </Paper>

          <FormHelperText>
            {errors.tags || "Choose one or more article tags"}
          </FormHelperText>
        </FormControl>
      </Grid>
    </Form>
  );
}

export default ArticleForm;
