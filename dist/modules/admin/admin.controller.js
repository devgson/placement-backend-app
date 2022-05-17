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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_dto_1 = require("./admin.dto");
const admin_guard_1 = require("./admin.guard");
const admin_interceptor_1 = require("./admin.interceptor");
const admin_pipe_1 = require("./admin.pipe");
const admin_schema_1 = require("./admin.schema");
const admin_service_1 = require("./admin.service");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getTutor(query) {
        const tutors = await this.adminService.getTutors(query);
        return {
            data: tutors,
            message: 'Tutors retrieved successfully',
        };
    }
    async getPlacements(query) {
        const placements = await this.adminService.getPlacements(query);
        return {
            data: placements,
            message: 'Placements retrieved successfully',
        };
    }
    async getRegistrations(query) {
        const registrations = await this.adminService.getRegistrations(query);
        return {
            data: registrations,
            message: 'Registrations retrieved successfully',
        };
    }
    async approveRegistration(body, params) {
        const registration = await this.adminService.approveRegistration(params.registrationId, body.type);
        return {
            data: registration,
            message: 'Registration approved successfully',
        };
    }
    async rejectRegistration(body, params) {
        const registration = await this.adminService.rejectRegistration(params.registrationId, body.type);
        return {
            data: registration,
            message: 'Registration rejected successfully',
        };
    }
    async getAuthorizationRequests(query) {
        const authorizationRequests = await this.adminService.getAuthorizationRequests(query);
        return {
            data: authorizationRequests,
            message: 'Authorization Requests retrieved successfully',
        };
    }
    async approveAuthorizationRequest(body, params) {
        const authorizationRequest = await this.adminService.approveAuthorizationRequest(body, params.authorizationRequestId);
        return {
            data: authorizationRequest,
            message: 'Authorization Request approved successfully',
        };
    }
    async rejectAuthorizationRequest(body, params) {
        const authorizationRequest = await this.adminService.rejectAuthorizationRequest(body, params.authorizationRequestId);
        return {
            data: authorizationRequest,
            message: 'Authorization Request rejected successfully',
        };
    }
};
__decorate([
    (0, common_1.Get)('/tutors'),
    __param(0, (0, common_1.Query)(new admin_pipe_1.JoiValidationPipe(admin_schema_1.GetTutorSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.GetTutorDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTutor", null);
__decorate([
    (0, common_1.Get)('/placements'),
    __param(0, (0, common_1.Query)(new admin_pipe_1.JoiValidationPipe(admin_schema_1.GetPlacementSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.GetPlacementDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPlacements", null);
__decorate([
    (0, common_1.Get)('/registrations'),
    __param(0, (0, common_1.Query)(new admin_pipe_1.JoiValidationPipe(admin_schema_1.GetRegistrationsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.GetRegistrationsDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getRegistrations", null);
__decorate([
    (0, common_1.Post)('/registrations/:registrationId/approve'),
    __param(0, (0, common_1.Body)(new admin_pipe_1.JoiValidationPipe(admin_schema_1.ApproveRegistrationSchema.body))),
    __param(1, (0, common_1.Param)(new admin_pipe_1.JoiValidationPipe(admin_schema_1.ApproveRegistrationSchema.params))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.ApproveRegistrationDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveRegistration", null);
__decorate([
    (0, common_1.Post)('/registrations/:registrationId/reject'),
    __param(0, (0, common_1.Body)(new admin_pipe_1.JoiValidationPipe(admin_schema_1.RejectRegistrationSchema.body))),
    __param(1, (0, common_1.Param)(new admin_pipe_1.JoiValidationPipe(admin_schema_1.RejectRegistrationSchema.params))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.RejectRegistrationDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "rejectRegistration", null);
__decorate([
    (0, common_1.Get)('/authorization-requests'),
    __param(0, (0, common_1.Query)(new admin_pipe_1.JoiValidationPipe(admin_schema_1.GetAuthorizationRequestsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.GetAuthorizationRequestsDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAuthorizationRequests", null);
__decorate([
    (0, common_1.Post)('/authorization-requests/:authorizationRequestId/approve'),
    __param(0, (0, common_1.Body)(new admin_pipe_1.JoiValidationPipe(admin_schema_1.ApproveAuthorizationRequestSchema.body))),
    __param(1, (0, common_1.Param)(new admin_pipe_1.JoiValidationPipe(admin_schema_1.ApproveAuthorizationRequestSchema.params))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.ApproveAuthorizationRequestDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveAuthorizationRequest", null);
__decorate([
    (0, common_1.Post)('/authorization-requests/:authorizationRequestId/reject'),
    __param(0, (0, common_1.Body)(new admin_pipe_1.JoiValidationPipe(admin_schema_1.RejectAuthorizationRequestSchema.body))),
    __param(1, (0, common_1.Param)(new admin_pipe_1.JoiValidationPipe(admin_schema_1.RejectAuthorizationRequestSchema.params))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.RejectAuthorizationRequestDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "rejectAuthorizationRequest", null);
AdminController = __decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.UseInterceptors)(admin_interceptor_1.AdminAuthInterceptor),
    (0, common_1.UseInterceptors)(admin_interceptor_1.ResponseTransformerInterceptor),
    (0, common_1.Controller)('/admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map