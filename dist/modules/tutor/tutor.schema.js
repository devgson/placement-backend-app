"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulePlacementVisitStatusSchema = exports.SchedulePlacementVisitSchema = exports.GetTutorPlacementsSchema = void 0;
const Joi = require("joi");
exports.GetTutorPlacementsSchema = Joi.object({
    scheduledVisit: Joi.boolean()
        .messages({ 'any.only': 'Invalid field, send only true' })
        .optional(),
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
exports.SchedulePlacementVisitSchema = {
    body: Joi.object({
        scheduledVisitDate: Joi.date().iso().required().messages({
            'any.required': 'Scheduled Visit Date is required',
            'date.format': 'Scheduled Visit Date must be in iso format',
        }),
        scheduledVisitType: Joi.string()
            .required()
            .valid('virtual', 'physical')
            .messages({
            'string.empty': 'Placement Status cannot be empty',
            'any.only': 'Invalid field, send either virtual or physical',
        }),
    }),
    params: Joi.object({
        placementId: Joi.string().guid().required().messages({
            'any.required': 'Placement Id is required',
            'string.empty': 'Placement Id cannot be empty',
            'string.guid': 'Placement Id must be a valid uuid',
        }),
    }),
};
exports.SchedulePlacementVisitStatusSchema = {
    body: Joi.object({
        scheduledVisitStatus: Joi.string()
            .required()
            .valid('done', 'pending')
            .messages({
            'string.empty': 'Status cannot be empty',
            'any.only': 'Invalid field, send either done or pending',
        }),
    }),
    params: Joi.object({
        placementId: Joi.string().guid().required().messages({
            'any.required': 'Placement Id is required',
            'string.empty': 'Placement Id cannot be empty',
            'string.guid': 'Placement Id must be a valid uuid',
        }),
    }),
};
//# sourceMappingURL=tutor.schema.js.map