const Joi = require("joi");

const path = require("path");
const { validateBody } = require(path.join(__dirname, "..", "middlewares"));

const emailRegex = /^\S+@\S+\.\S+$/;

const signUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.alternatives().try("starter", "pro", "business").optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const subSchema = Joi.object({
  subscription: Joi.alternatives().try("starter", "pro", "business").required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
});

module.exports = {
  signUp: validateBody(signUpSchema),
  login: validateBody(loginSchema),
  sub: validateBody(subSchema),
  email: validateBody(emailSchema),
};
