// middleware/validate.js
import httpStatus from "http-status"

export const reqValidator = (schema) => (req, res, next) => {
    
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: true,
      status: httpStatus.BAD_REQUEST,
      error: 'Validation failed',
      message: error.details.map(d => d.message)[0],
      result:{}
    });
  }
  next();
};
