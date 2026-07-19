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

  author: Joi.number().integer().positive().required(),

  tags: Joi.array().items(Joi.number().integer().positive()).default([]),

  published_at: Joi.date().required(),

  views: Joi.number().integer().min(0).default(0),

  likes: Joi.number().integer().min(0).default(0),

  word_count: Joi.number().integer().min(0).default(0),

  is_breaking_news: Joi.boolean().default(false),
});
