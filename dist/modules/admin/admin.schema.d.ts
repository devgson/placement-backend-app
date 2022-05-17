import * as Joi from 'joi';
export declare const GetTutorSchema: Joi.ObjectSchema<any>;
export declare const GetStudentSchema: Joi.ObjectSchema<any>;
export declare const GetPlacementSchema: Joi.ObjectSchema<any>;
export declare const GetRegistrationsSchema: Joi.ObjectSchema<any>;
export declare const ApproveRegistrationSchema: {
    body: Joi.ObjectSchema<any>;
    params: Joi.ObjectSchema<any>;
};
export declare const RejectRegistrationSchema: {
    body: Joi.ObjectSchema<any>;
    params: Joi.ObjectSchema<any>;
};
export declare const GetAuthorizationRequestsSchema: Joi.ObjectSchema<any>;
export declare const ApproveAuthorizationRequestSchema: {
    body: Joi.ObjectSchema<any>;
    params: Joi.ObjectSchema<any>;
};
export declare const RejectAuthorizationRequestSchema: {
    body: Joi.ObjectSchema<any>;
    params: Joi.ObjectSchema<any>;
};
