// validation/schoolSchema.js
import Joi from 'joi';

export const schoolSchema = Joi.object({
  name: Joi.string().required().empty('').messages({
    'string.base': 'School name should be string',
    'any.required': 'School name is required',
    'string.empty': 'School name cannot be empty',
  }),
  address: Joi.string().required().empty('').messages({
    'string.base': 'School address should be string',
    'any.required': 'School Address is required',
    'string.empty': 'School address cannot be empty',
  }),
  latitude: Joi.number().strict().required().empty('').messages({
    'number.base': 'Latitude must be a number',
    'any.required': 'Latitude is required',
    'string.empty': 'Latitude cannot be empty',
  }),
  longitude: Joi.number().strict().required().empty('').messages({
    'number.base': 'Longitude must be a number',
    'any.required': 'Longitude is required',
    'string.empty': 'Longitude cannot be empty',
  }),
});
