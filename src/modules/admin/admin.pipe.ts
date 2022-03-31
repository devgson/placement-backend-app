import * as Joi from 'joi';
import { forEach } from 'lodash';
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: Joi.ObjectSchema) {}

  transform(val: any) {
    const { value, error } = this.schema.validate(val || {}, {
      abortEarly: false,
      //stripUnknown: true,
    });

    if (error) {
      const errorObject = {};

      forEach(error.details, (err) => {
        const key = err.path[0];
        errorObject[key] = err.message;
      });

      throw new BadRequestException({
        message: 'Invalid Request',
        error: errorObject,
      });
    }

    return value;
  }
}
