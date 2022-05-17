"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAuthorizationRequestSchema = exports.CreateAuthorizationRequestSchema = exports.GetAuthorizationRequestSchema = exports.SubmitPlacementReportSchema = exports.GetPlacementSchema = void 0;
const Joi = require("joi");
exports.GetPlacementSchema = Joi.object({
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
exports.SubmitPlacementReportSchema = {
    file: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.any(),
        buffer: Joi.any(),
        mimetype: Joi.string()
            .required()
            .custom((value, helpers) => {
            if (value === 'application/pdf')
                return value;
            else
                return helpers.error('any.invalid');
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
        month: Joi.date().iso().messages({
            'any.required': 'Month is required',
            'date.format': 'Month must be in iso format',
        }),
        rating: Joi.number().required().messages({
            'any.required': 'Rating is required',
            'string.empty': 'Rating cannot be empty',
        }),
    }),
    params: Joi.object({
        placementId: Joi.string().guid().messages({
            'any.required': 'Placement Id is required',
            'string.empty': 'Placement Id cannot be empty',
            'string.guid': 'Placement Id must be a valid uuid',
        }),
    }),
};
exports.GetAuthorizationRequestSchema = Joi.object({
    status: Joi.string()
        .valid('pending', 'approved', 'rejected')
        .messages({
        'string.empty': 'Authorization Request Status cannot be empty',
        'any.only': 'Invalid field, send either pending, approved or rejected',
    })
        .optional(),
    id: Joi.string()
        .guid()
        .messages({
        'string.empty': 'Authorization Request Id cannot be empty',
        'string.guid': 'Authorization Request Id must be a valid uuid',
    })
        .optional(),
});
exports.CreateAuthorizationRequestSchema = {
    file: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.any(),
        buffer: Joi.any(),
        mimetype: Joi.string()
            .required()
            .custom((value, helpers) => {
            if (value === 'application/pdf')
                return value;
            else
                return helpers.error('any.invalid');
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
        companyName: Joi.string().trim().min(3).required().messages({
            'any.required': 'Company Name is required',
            'string.empty': 'Company Name cannot be empty',
            'string.min': 'Company name must be at least 3 characters long',
        }),
        companySector: Joi.string().trim().min(3).required().messages({
            'any.required': 'Company Sector is required',
            'string.empty': 'Company Sector cannot be empty',
            'string.min': 'Company Sector must be at least 3 characters long',
        }),
        location: Joi.string().trim().required().messages({
            'any.required': 'Location is required',
            'string.empty': 'Location cannot be empty',
        }),
        latitude: Joi.string().required().messages({
            'any.required': 'Latitude is required',
            'string.empty': 'Latitude cannot be empty',
        }),
        longitude: Joi.string().required().messages({
            'any.required': 'Longitude is required',
            'string.empty': 'Longitude cannot be empty',
        }),
        potentialStartDate: Joi.date().iso().messages({
            'any.required': 'Potential Start Date is required',
            'date.format': 'Potential Start Date must be in iso format',
        }),
        potentialEndDate: Joi.date().iso().messages({
            'any.required': 'Potential End Date is required',
            'date.format': 'Potential End Date must be in iso format',
        }),
        studentComment: Joi.string()
            .trim()
            .max(255)
            .required()
            .messages({
            'string.max': 'Student Comment must not be greater than 255 characters',
        })
            .optional(),
    }),
};
exports.DeleteAuthorizationRequestSchema = Joi.object({
    authorizationRequestId: Joi.string()
        .guid()
        .messages({
        'string.empty': 'Authorization Request cannot be empty',
        'string.guid': 'Authorization Request must be a valid uuid',
    })
        .optional(),
});
//# sourceMappingURL=student.schema.js.map