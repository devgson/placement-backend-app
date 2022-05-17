import * as Joi from 'joi';
export declare const LoginSchema: Joi.ObjectSchema<any>;
export declare const RegisterStudentSchema: {
    file: Joi.ObjectSchema<any>;
    body: Joi.ObjectSchema<any>;
};
export declare const RegisterTutorSchema: {
    file: Joi.ObjectSchema<any>;
    body: Joi.ObjectSchema<any>;
};
