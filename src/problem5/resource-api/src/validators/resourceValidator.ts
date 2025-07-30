import Joi from 'joi';

export const createResourceSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateResourceSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
});