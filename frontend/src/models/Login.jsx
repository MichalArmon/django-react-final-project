import Joi from "joi";

const Login = Joi.object({
  username: Joi.string().trim().min(3).max(150).required().messages({
    "string.empty": "Username or email is required",
    "string.min": "Enter at least 3 characters",
    "string.max": "Username or email is too long",
  }),

  password: Joi.string().min(8).max(100).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must contain at least 8 characters",
    "string.max": "Password is too long",
  }),
});

export default Login;
