import Joi from "joi";

const EditProfile = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),

  lastName: Joi.string().min(2).max(50).required(),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),

  bio: Joi.string().allow("").max(500),

  city: Joi.string().allow("").max(100),

  age: Joi.number().integer().min(18).max(120).required(),

  experience_years: Joi.number().integer().min(0).max(100).required(),

  role: Joi.string().allow(""),
});

export default EditProfile;
