const Joi = require("joi");
const path = require("path");
const { validateBody } = require(path.join(__dirname, "..", "middlewares"));

const addSchema = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  email: Joi.string().email().min(3).max(35).required(),
  phone: Joi.string().min(3).max(20).required(),
  favorite: Joi.boolean().optional(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(3).max(25).optional(),
  email: Joi.string().email().min(3).max(35).optional(),
  phone: Joi.string().min(3).max(20).optional(),
  favorite: Joi.boolean().optional(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  add: validateBody(addSchema),
  update: validateBody(updateSchema),
  updateStatus: validateBody(updateStatusSchema),
};
