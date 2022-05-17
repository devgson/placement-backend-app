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
exports.ResponseTransformerInterceptor = exports.StudentAuthInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const auth_service_1 = require("../auth/auth.service");
const student_repository_1 = require("./student.repository");
let StudentAuthInterceptor = class StudentAuthInterceptor {
    constructor(authService, studentRepository) {
        this.authService = authService;
        this.studentRepository = studentRepository;
    }
    async intercept(context, next) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const jwt = (_a = request.headers) === null || _a === void 0 ? void 0 : _a.authorization.replace('Bearer ', '');
        const token = await this.authService.validateJWT(jwt);
        const student = await this.studentRepository.getStudent({
            email: token.email,
        });
        request.user = student;
        return next.handle();
    }
};
StudentAuthInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        student_repository_1.StudentRepository])
], StudentAuthInterceptor);
exports.StudentAuthInterceptor = StudentAuthInterceptor;
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
//# sourceMappingURL=student.interceptor.js.map