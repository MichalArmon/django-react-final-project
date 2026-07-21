import Joi from "joi";

export const articleSchema = Joi.object({
  title: Joi.string().trim().min(2).max(200).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must contain at least 2 characters",
    "string.max": "Title cannot exceed 200 characters",
  }),

  content: Joi.string().trim().min(10).required().messages({
    "string.empty": "Content is required",
    "string.min": "Content must contain at least 10 characters",
  }),

  tags: Joi.array().items(Joi.number().integer().positive()).default([]),
});
