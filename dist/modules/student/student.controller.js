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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_schema_1 = require("./student.schema");
const student_pipe_1 = require("./student.pipe");
const student_service_1 = require("./student.service");
const student_guard_1 = require("./student.guard");
const student_interceptor_1 = require("./student.interceptor");
const create_authorization_request_1 = require("./dto/create-authorization-request");
const platform_express_1 = require("@nestjs/platform-express");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    async getPlacements(req, query) {
        const placements = await this.studentService.getPlacements(req.user.id, query.status, query.id);
        return {
            data: placements,
            message: 'Placements retrieved successfully',
        };
    }
    async submitPlacementReport(req, body, param, file) {
        const report = Object.assign(Object.assign({}, body), { studentId: req.user.id, placementId: param.placementId });
        const createdReport = await this.studentService.submitMonthlyReport(report, file);
        return {
            data: createdReport,
            message: 'Submitted monthly placement report successfully',
        };
    }
    async getAuthorizationRequests(req, query) {
        const authorizationRequests = await this.studentService.getAuthorizationRequests(req.user.id, query.status, query.id);
        return {
            data: authorizationRequests,
            message: 'Authorization requests retrieved successfully',
        };
    }
    async createAuthorizationRequest(req, body, file) {
        const authorizationRequest = await this.studentService.createAuthorizationRequest(req.user.id, body, file);
        return {
            data: authorizationRequest,
            message: 'Created authorization request successfully',
        };
    }
    async deleteAuthorizationRequest(req, param) {
        await this.studentService.deleteAuthorizationRequest(req.user.id, param.authorizationRequestId);
        return {
            data: null,
            message: 'Deleted authorization request successfully',
        };
    }
};
__decorate([
    (0, common_1.Get)('/placements'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)(new student_pipe_1.JoiValidationPipe(student_schema_1.GetPlacementSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getPlacements", null);
__decorate([
    (0, common_1.Post)('/placements/:placementId/report'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('report')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new student_pipe_1.JoiValidationPipe(student_schema_1.SubmitPlacementReportSchema.body))),
    __param(2, (0, common_1.Param)(new student_pipe_1.JoiValidationPipe(student_schema_1.SubmitPlacementReportSchema.params))),
    __param(3, (0, common_1.UploadedFile)(new student_pipe_1.JoiValidationPipe(student_schema_1.SubmitPlacementReportSchema.file))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "submitPlacementReport", null);
__decorate([
    (0, common_1.Get)('/authorization-requests'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)(new student_pipe_1.JoiValidationPipe(student_schema_1.GetAuthorizationRequestSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "getAuthorizationRequests", null);
__decorate([
    (0, common_1.Post)('/authorization-requests'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('requestForm')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new student_pipe_1.JoiValidationPipe(student_schema_1.CreateAuthorizationRequestSchema.body))),
    __param(2, (0, common_1.UploadedFile)(new student_pipe_1.JoiValidationPipe(student_schema_1.CreateAuthorizationRequestSchema.file))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_authorization_request_1.CreateAuthorizationRequestDto, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "createAuthorizationRequest", null);
__decorate([
    (0, common_1.Delete)('/authorization-requests/:authorizationRequestId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)(new student_pipe_1.JoiValidationPipe(student_schema_1.DeleteAuthorizationRequestSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StudentController.prototype, "deleteAuthorizationRequest", null);
StudentController = __decorate([
    (0, common_1.UseGuards)(student_guard_1.StudentGuard),
    (0, common_1.UseInterceptors)(student_interceptor_1.StudentAuthInterceptor),
    (0, common_1.UseInterceptors)(student_interceptor_1.ResponseTransformerInterceptor),
    (0, common_1.Controller)('/students'),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
exports.StudentController = StudentController;
//# sourceMappingURL=student.controller.js.map