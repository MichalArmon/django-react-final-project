import Joi from "joi";

const User = Joi.object({
  firstName: Joi.string().min(2).max(20),
  lastName: Joi.string().min(2).max(20),
});

export default User;
