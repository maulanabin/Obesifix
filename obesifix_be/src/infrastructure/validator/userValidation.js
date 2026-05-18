import Joi from "joi";

export const registerUserValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().integer().min(1).required(),
    gender: Joi.string().valid("male", "female").required(),
    height: Joi.number().positive().required(),
    weight: Joi.number().positive().required(),
    activity: Joi.string()
      .valid("sedentary", "lowActive", "active", "veryActive")
      .required(),
    food_type: Joi.string().required(),
  });

  return schema.validate(payload);
};

export const loginUserValidation = (payload) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(payload);
};

export const updateUserValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().allow(null),
    age: Joi.number().integer().min(1).allow(null),
    height: Joi.number().positive().allow(null),
    weight: Joi.number().positive().allow(null),
    activity: Joi.string()
      .valid("sedentary", "lowActive", "active", "veryActive")
      .allow(null),
    food_type: Joi.string().allow(null),
  });

  return schema.validate(payload);
};

export const refreshTokenValidation = (payload) => {
  const schema = Joi.object({
    refresh_token: Joi.string().required(),
  });

  return schema.validate(payload);
};
