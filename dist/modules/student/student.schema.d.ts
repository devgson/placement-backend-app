import * as Joi from 'joi';
export declare const GetPlacementSchema: Joi.ObjectSchema<any>;
export declare const SubmitPlacementReportSchema: {
    file: Joi.ObjectSchema<any>;
    body: Joi.ObjectSchema<any>;
    params: Joi.ObjectSchema<any>;
};
export declare const GetAuthorizationRequestSchema: Joi.ObjectSchema<any>;
export declare const CreateAuthorizationRequestSchema: {
    file: Joi.ObjectSchema<any>;
    body: Joi.ObjectSchema<any>;
};
export declare const DeleteAuthorizationRequestSchema: Joi.ObjectSchema<any>;
