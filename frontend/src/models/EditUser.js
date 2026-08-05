import Joi from "joi";

const EditUser = Joi.object({
  username: Joi.string().min(2).max(150).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must contain at least 2 characters",
  }),

  firstName: Joi.string().min(2).max(50).required().messages({
    "string.empty": "First name is required",
  }),

  lastName: Joi.string().min(2).max(50).required().messages({
    "string.empty": "Last name is required",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email must be valid",
    }),

  bio: Joi.string().allow("").max(500),

  city: Joi.string().allow("").max(100),

  age: Joi.number().integer().min(18).max(120).required().messages({
    "number.base": "Age must be a number",
    "number.min": "Age must be at least 18",
  }),

  experience_years: Joi.number().integer().min(0).max(100).required().messages({
    "number.base": "Experience years must be a number",
    "number.min": "Experience years cannot be negative",
  }),

  role: Joi.string().valid("reader", "manager", "admin").required().messages({
    "any.only": "Role must be Reader, Manager or Admin",
    "string.empty": "Role is required",
  }),
});

export default EditUser;
