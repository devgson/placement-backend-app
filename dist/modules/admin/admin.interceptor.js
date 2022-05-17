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
exports.ResponseTransformerInterceptor = exports.AdminAuthInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const auth_repository_1 = require("../auth/auth.repository");
const auth_service_1 = require("../auth/auth.service");
let AdminAuthInterceptor = class AdminAuthInterceptor {
    constructor(authService, authRepository) {
        this.authService = authService;
        this.authRepository = authRepository;
    }
    async intercept(context, next) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const jwt = (_a = request.headers) === null || _a === void 0 ? void 0 : _a.authorization.replace('Bearer ', '');
        const token = await this.authService.validateJWT(jwt);
        const admin = await this.authRepository.getAdmin({ email: token.email });
        request.user = admin;
        return next.handle();
    }
};
AdminAuthInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        auth_repository_1.AuthRepository])
], AdminAuthInterceptor);
exports.AdminAuthInterceptor = AdminAuthInterceptor;
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
//# sourceMappingURL=admin.interceptor.js.map