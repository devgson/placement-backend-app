import * as Joi from 'joi';

export const LoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'Email cannot be empty',
    'string.email': 'Invalid email address',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password cannot be empty',
  }),
});

export const RegisterStudentSchema = {
  file: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.any(),
    buffer: Joi.any(),
    mimetype: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (value === 'application/pdf') return value;
        else return helpers.error('any.invalid');
      })
      .messages({
        'any.invalid': 'File is not a valid image type',
      }),
    size: Joi.number()
      .required()
      .less(10 * 1000000)
      .messages({
        'number.less': 'Image is too large, must be less than 10MB',
      }),
  }),

  body: Joi.object({
    fullName: Joi.string().trim().min(3).required().messages({
      'any.required': 'Fullname is required',
      'string.empty': 'Fullname cannot be empty',
      'string.min':
        'Full name must be at least 3 characters long, please remove leading or trailing spaces',
    }),
    currentLevel: Joi.string().required().messages({
      'any.required': 'Current Level is required',
      'string.empty': 'Current Level cannot be empty',
    }),
    course: Joi.string().required().messages({
      'any.required': 'course is required',
      'string.empty': 'course cannot be empty',
    }),
    phoneNumber: Joi.string().required().messages({
      'any.required': 'Phone Number is required',
      'string.empty': 'Phone Number cannot be empty',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Invalid email address',
    }),
  }),
};

export const RegisterTutorSchema = {
  file: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.any(),
    buffer: Joi.any(),
    mimetype: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (value === 'application/pdf') return value;
        else return helpers.error('any.invalid');
      })
      .messages({
        'any.invalid': 'File is not a valid image type',
      }),
    size: Joi.number()
      .required()
      .less(10 * 1000000)
      .messages({
        'number.less': 'Image is too large, must be less than 10MB',
      }),
  }),

  body: Joi.object({
    fullName: Joi.string().trim().min(3).required().messages({
      'any.required': 'Fullname is required',
      'string.empty': 'Fullname cannot be empty',
      'string.min':
        'Full name must be at least 3 characters long, please remove leading or trailing spaces',
    }),
    position: Joi.string().required().messages({
      'any.required': 'Current Level is required',
      'string.empty': 'Current Level cannot be empty',
    }),
    phoneNumber: Joi.string().required().messages({
      'any.required': 'Phone Number is required',
      'string.empty': 'Phone Number cannot be empty',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
      'string.empty': 'Password cannot be empty',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.empty': 'Email cannot be empty',
      'string.email': 'Invalid email address',
    }),
  }),
};
