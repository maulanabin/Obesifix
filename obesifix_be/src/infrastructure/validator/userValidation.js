import Joi from "joi";

export const registerUserValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    age: Joi.number().required(),
    gender: Joi.string().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
    activity: Joi.string().required(),
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
    age: Joi.number().allow(null),
    height: Joi.number().allow(null),
    weight: Joi.number().allow(null),
    activity: Joi.string().allow(null),
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
