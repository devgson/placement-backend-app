"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiValidationPipe = void 0;
const Joi = require("joi");
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
let JoiValidationPipe = class JoiValidationPipe {
    constructor(schema) {
        this.schema = schema;
    }
    transform(val) {
        const { value, error } = this.schema.validate(val || {}, {
            abortEarly: false,
        });
        if (error) {
            const errorObject = {};
            (0, lodash_1.forEach)(error.details, (err) => {
                const key = err.path[0];
                errorObject[key] = err.message;
            });
            throw new common_1.BadRequestException({
                message: 'Invalid Request',
                error: errorObject,
            });
        }
        return value;
    }
};
JoiValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], JoiValidationPipe);
exports.JoiValidationPipe = JoiValidationPipe;
//# sourceMappingURL=admin.pipe.js.map