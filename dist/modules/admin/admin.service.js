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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma.service");
const student_repository_1 = require("../student/student.repository");
const tutor_repository_1 = require("../tutor/tutor.repository");
const admin_repository_1 = require("./admin.repository");
let AdminService = class AdminService {
    constructor(prisma, adminRepository, tutorRepository, studentRepository) {
        this.prisma = prisma;
        this.adminRepository = adminRepository;
        this.tutorRepository = tutorRepository;
        this.studentRepository = studentRepository;
    }
    async getTutors(query) {
        return this.tutorRepository.getTutors(query);
    }
    async getPlacements(query) {
        return await this.adminRepository.getPlacements(query);
    }
    async getRegistrations(query) {
        switch (query.type) {
            case 'tutor':
                return await this.tutorRepository.getTutors(query);
            case 'student':
                return await this.studentRepository.getStudents(query);
            default:
                return (await Promise.all([
                    this.tutorRepository.getTutors(query),
                    this.studentRepository.getStudents(query),
                ])).flat();
        }
    }
    async approveRegistration(registrationId, type) {
        if (type === 'student') {
            return await this.adminRepository.approveStudentRegistration(registrationId);
        }
        if (type === 'tutor') {
            return await this.adminRepository.approveTutorRegistration(registrationId);
        }
    }
    async rejectRegistration(registrationId, type) {
        if (type === 'student') {
            return await this.adminRepository.rejectStudentRegistration(registrationId);
        }
        if (type === 'tutor') {
            return await this.adminRepository.rejectTutorRegistration(registrationId);
        }
    }
    async getAuthorizationRequests(query) {
        return await this.adminRepository.getAuthorizationRequests(query);
    }
    async approveAuthorizationRequest(data, authorizationRequestId) {
        return await this.prisma.$transaction(async () => {
            const request = await this.adminRepository.approveAuthorizationRequest(authorizationRequestId, {
                adminComment: data.comment,
            });
            return await this.adminRepository.createPlacement(request, data.tutorId, request.studentId);
        });
    }
    async rejectAuthorizationRequest(data, authorizationRequestId) {
        return await this.adminRepository.rejectAuthorizationRequest(authorizationRequestId, {
            adminComment: data.comment,
        });
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        admin_repository_1.AdminRepository,
        tutor_repository_1.TutorRepository,
        student_repository_1.StudentRepository])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map