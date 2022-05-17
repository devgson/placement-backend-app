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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const file_service_1 = require("../../services/file.service");
const student_repository_1 = require("./student.repository");
let StudentService = class StudentService {
    constructor(fileService, studentRepository) {
        this.fileService = fileService;
        this.studentRepository = studentRepository;
    }
    async getPlacements(studentId, status, placementId) {
        const criteria = {};
        if (status)
            criteria.status = status;
        if (placementId)
            criteria.id = placementId;
        return await this.studentRepository.getStudentPlacements(studentId, criteria);
    }
    async getAuthorizationRequests(studentId, status, authorizationRequestId) {
        const criteria = {};
        if (status)
            criteria.status = status;
        if (authorizationRequestId)
            criteria.id = authorizationRequestId;
        return await this.studentRepository.getAuthorizationRequests(Object.assign({ studentId }, criteria));
    }
    async deleteAuthorizationRequest(studentId, authorizationRequestId) {
        const authorizationRequest = await this.studentRepository.getAuthorizationRequest({
            studentId,
            id: authorizationRequestId,
            status: client_1.ApplicationStatus.pending,
        });
        if (!authorizationRequest) {
            throw new common_1.UnauthorizedException('You cannot perform such action');
        }
        return await this.studentRepository.deleteAuthorizationRequest(authorizationRequest.id);
    }
    async createAuthorizationRequest(studentId, authorizationRequest, file) {
        const uploadedFile = await this.fileService.uploadFile(file);
        return await this.studentRepository.createAuthorizationRequest(Object.assign(Object.assign({}, authorizationRequest), { requestForm: uploadedFile.secure_url, student: {
                connect: { id: studentId },
            } }));
    }
    async submitMonthlyReport(placementReport, file) {
        const placement = await this.studentRepository.getPlacement({
            status: client_1.PlacementStatus.active,
            id: placementReport.placementId,
            studentId: placementReport.studentId,
        });
        if (!placement) {
            throw new common_1.UnauthorizedException('You cannot perform such action');
        }
        const uploadedFile = await this.fileService.uploadFile(file);
        return await this.studentRepository.createPlacementReport({
            month: placementReport.month,
            rating: placementReport.rating,
            report: uploadedFile.secure_url,
            placement: {
                connect: { id: placement.id },
            },
        });
    }
};
StudentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService,
        student_repository_1.StudentRepository])
], StudentService);
exports.StudentService = StudentService;
//# sourceMappingURL=student.service.js.map