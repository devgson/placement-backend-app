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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const auth_interceptor_1 = require("./auth.interceptor");
const auth_pipe_1 = require("./auth.pipe");
const auth_schema_1 = require("./auth.schema");
const auth_service_1 = require("./auth.service");
const register_student_dto_1 = require("./dto/register-student.dto");
const register_tutor_dto_1 = require("./dto/register-tutor.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async registerStudent(body, file) {
        const student = await this.authService.registerStudent(body, file);
        return {
            data: student,
            message: 'Registered Student Successfully',
        };
    }
    async registerTutor(body, file) {
        const tutor = await this.authService.registerTutor(body, file);
        return {
            data: tutor,
            message: 'Registered Tutor Successfully',
        };
    }
    async tutorLogin(body) {
        const token = await this.authService.tutorLogin(body.email, body.password);
        return {
            message: 'Logged In as Tutor successfully',
            data: token,
        };
    }
    async studentLogin(body) {
        const token = await this.authService.studentLogin(body.email, body.password);
        return {
            data: token,
            message: 'Logged In as Student successfully',
        };
    }
    async adminLogIn(body) {
        const token = await this.authService.adminLogin(body.email, body.password);
        return {
            data: token,
            message: 'Logged In as Admin successfully',
        };
    }
};
__decorate([
    (0, common_1.Post)('/register/student'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('universityId')),
    __param(0, (0, common_1.Body)(new auth_pipe_1.JoiValidationPipe(auth_schema_1.RegisterStudentSchema.body))),
    __param(1, (0, common_1.UploadedFile)(new auth_pipe_1.JoiValidationPipe(auth_schema_1.RegisterStudentSchema.file))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_student_dto_1.RegisterStudentDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerStudent", null);
__decorate([
    (0, common_1.Post)('/register/tutor'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('universityId')),
    __param(0, (0, common_1.Body)(new auth_pipe_1.JoiValidationPipe(auth_schema_1.RegisterTutorSchema.body))),
    __param(1, (0, common_1.UploadedFile)(new auth_pipe_1.JoiValidationPipe(auth_schema_1.RegisterTutorSchema.file))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_tutor_dto_1.RegisterTutorDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerTutor", null);
__decorate([
    (0, common_1.Post)('/login/tutor'),
    (0, common_1.UsePipes)(new auth_pipe_1.JoiValidationPipe(auth_schema_1.LoginSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "tutorLogin", null);
__decorate([
    (0, common_1.Post)('/login/student'),
    (0, common_1.UsePipes)(new auth_pipe_1.JoiValidationPipe(auth_schema_1.LoginSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "studentLogin", null);
__decorate([
    (0, common_1.Post)('/login/admin'),
    (0, common_1.UsePipes)(new auth_pipe_1.JoiValidationPipe(auth_schema_1.LoginSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminLogIn", null);
AuthController = __decorate([
    (0, common_1.UseInterceptors)(auth_interceptor_1.ResponseTransformerInterceptor),
    (0, common_1.Controller)('/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map