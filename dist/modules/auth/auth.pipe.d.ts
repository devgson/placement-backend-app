import * as Joi from 'joi';
import { PipeTransform } from '@nestjs/common';
export declare class JoiValidationPipe implements PipeTransform {
    private schema;
    constructor(schema: Joi.ObjectSchema);
    transform(val: any): any;
}
