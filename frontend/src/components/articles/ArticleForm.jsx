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

import { useEffect, useMemo, useState } from "react";

import Form from "../form/Form";
import useForm from "../../hooks/useForm";
import { articleSchema } from "../../models/Article";
import api from "../../services/apiService";

function ArticleForm({ handleSubmitArticle, initialDataArticle, title }) {
  const normalizedInitialData = useMemo(() => {
    return {
      ...initialDataArticle,

      tags:
        initialDataArticle?.tags?.map((tag) =>
          typeof tag === "object" ? Number(tag.id) : Number(tag),
        ) || [],
    };
  }, [initialDataArticle]);

  const { handleChange, handleSubmit, errors, formDetails, handleReset } =
    useForm(normalizedInitialData, articleSchema, handleSubmitArticle);

  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const response = await api.get("/tags/");

        const tags = response.data.results || response.data;

        setTagOptions(Array.isArray(tags) ? tags : []);
      } catch (error) {
        console.log("Get tags error:", error.response?.data || error.message);

        setTagOptions([]);
      }
    };

    getTags();
  }, []);

  const handleTagToggle = (tagId) => {
    const numericTagId = Number(tagId);

    const currentTags = (formDetails.tags || []).map((tag) =>
      typeof tag === "object" ? Number(tag.id) : Number(tag),
    );

    const updatedTags = currentTags.includes(numericTagId)
      ? currentTags.filter((currentTagId) => currentTagId !== numericTagId)
      : [...currentTags, numericTagId];

    handleChange({
      target: {
        name: "tags",
        value: updatedTags,
      },
    });
  };

  const selectedTagIds = (formDetails.tags || []).map((tag) =>
    typeof tag === "object" ? Number(tag.id) : Number(tag),
  );

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
                const tagId = Number(tag.id);

                const isSelected = selectedTagIds.includes(tagId);

                return (
                  <FormControlLabel
                    key={tagId}
                    label={tag.name}
                    control={
                      <Checkbox
                        checked={isSelected}
                        onChange={() => handleTagToggle(tagId)}
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
