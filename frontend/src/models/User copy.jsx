import Joi from "joi";

const User = Joi.object({
  password: Joi.string().min(8).max(100).required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  first_name: Joi.string().min(2).max(30).required(),

  last_name: Joi.string().min(2).max(30).required(),

  bio: Joi.string().min(2).max(300).allow("").optional(),

  city: Joi.string().min(2).max(50).required(),

  age: Joi.number().min(18).max(120).required(),

  experience_years: Joi.number().min(0).max(60).required(),

  role: Joi.string().valid("author", "reader", "admin").required(),
});

export default User;
