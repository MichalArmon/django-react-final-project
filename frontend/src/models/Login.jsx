import Joi from "joi";

const Login = Joi.object({
  password: Joi.string().min(8).max(100).required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

export default Login;
