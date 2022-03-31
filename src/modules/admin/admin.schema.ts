import * as Joi from 'joi';

export const GetTutorSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'approved', 'rejected')
    .messages({
      'string.empty': 'status cannot be empty',
      'any.only': 'Invalid field, send either pending, approved or rejected',
    })
    .optional(),
  id: Joi.string()
    .guid()
    .messages({
      'string.empty': 'Id cannot be empty',
      'string.guid': 'Id must be a valid uuid',
    })
    .optional(),
});

export const GetStudentSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'approved', 'rejected')
    .messages({
      'string.empty': 'status cannot be empty',
      'any.only': 'Invalid field, send either pending, approved or rejected',
    })
    .optional(),
  id: Joi.string()
    .guid()
    .messages({
      'string.empty': 'Id cannot be empty',
      'string.guid': 'Id must be a valid uuid',
    })
    .optional(),
});

export const GetPlacementSchema = Joi.object({
  status: Joi.string()
    .valid('active', 'completed')
    .messages({
      'string.empty': 'Placement Status cannot be empty',
      'any.only': 'Invalid field, send either active or completed',
    })
    .optional(),
  id: Joi.string()
    .guid()
    .messages({
      'string.empty': 'Placement Id cannot be empty',
      'string.guid': 'Placement Id must be a valid uuid',
    })
    .optional(),
});

export const GetRegistrationsSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'approved', 'rejected')
    .messages({
      'string.empty': 'status cannot be empty',
      'any.only': 'Invalid field, send either pending, approved or rejected',
    })
    .optional(),
  id: Joi.string()
    .guid()
    .messages({
      'string.empty': 'Id cannot be empty',
      'string.guid': 'Id must be a valid uuid',
    })
    .optional(),
  type: Joi.string()
    .valid('student', 'tutor')
    .messages({
      'string.empty': 'type cannot be empty',
      'any.only': 'Invalid field, send either student or tutor',
    })
    .optional(),
});

export const ApproveRegistrationSchema = {
  body: Joi.object({
    type: Joi.string().required().valid('student', 'tutor').messages({
      'any.required': 'Type is required',
      'string.empty': 'Type cannot be empty',
      'any.only': 'Invalid field, send either student or tutor',
    }),
  }),
  params: Joi.object({
    registrationId: Joi.string().guid().required().messages({
      'any.required': 'Registration Id is required',
      'string.empty': 'Field cannot be empty',
      'string.guid': 'Field must be a valid uuid',
    }),
  }),
};

export const RejectRegistrationSchema = {
  body: Joi.object({
    type: Joi.string().required().valid('student', 'tutor').messages({
      'any.required': 'Type is required',
      'string.empty': 'Type cannot be empty',
      'any.only': 'Invalid field, send either student or tutor',
    }),
  }),
  params: Joi.object({
    registrationId: Joi.string().required().guid().messages({
      'any.required': 'Registration Id is required',
      'string.empty': 'Field cannot be empty',
      'string.guid': 'Field must be a valid uuid',
    }),
  }),
};

export const GetAuthorizationRequestsSchema = Joi.object({
  status: Joi.string()
    .valid('pending', 'approved', 'rejected')
    .messages({
      'string.empty': 'status cannot be empty',
      'any.only': 'Invalid field, send either pending, approved or rejected',
    })
    .optional(),
  id: Joi.string()
    .guid()
    .messages({
      'string.empty': 'Id cannot be empty',
      'string.guid': 'Id must be a valid uuid',
    })
    .optional(),
});

export const ApproveAuthorizationRequestSchema = {
  body: Joi.object({
    tutorId: Joi.string().guid().required().messages({
      'any.required': 'Tutor Id is required',
      'string.empty': 'Field cannot be empty',
      'string.guid': 'Field must be a valid uuid',
    }),
    comment: Joi.string()
      .trim()
      .max(255)
      .required()
      .messages({
        'string.max': 'Comment must not be greater than 255 characters',
      })
      .optional(),
  }),
  params: Joi.object({
    registrationId: Joi.string().guid().required().messages({
      'any.required': 'Registration Id is required',
      'string.empty': 'Field cannot be empty',
      'string.guid': 'Field must be a valid uuid',
    }),
  }),
};

export const RejectAuthorizationRequestSchema = {
  body: Joi.object({
    comment: Joi.string()
      .trim()
      .max(255)
      .required()
      .messages({
        'string.max': 'Comment must not be greater than 255 characters',
      })
      .optional(),
  }),
  params: Joi.object({
    registrationId: Joi.string().guid().required().messages({
      'any.required': 'Registration Id is required',
      'string.empty': 'Field cannot be empty',
      'string.guid': 'Field must be a valid uuid',
    }),
  }),
};
