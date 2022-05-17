"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseTransformerInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ResponseTransformerInterceptor = class ResponseTransformerInterceptor {
    intercept(context, handler) {
        return handler.handle().pipe((0, rxjs_1.map)((data) => {
            return {
                statusCode: context.switchToHttp().getResponse().statusCode,
                message: data.message,
                data: data.data,
            };
        }));
    }
};
ResponseTransformerInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseTransformerInterceptor);
exports.ResponseTransformerInterceptor = ResponseTransformerInterceptor;
//# sourceMappingURL=auth.interceptor.js.map