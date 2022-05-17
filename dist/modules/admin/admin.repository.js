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
exports.AdminRepository = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../services/prisma.service");
let AdminRepository = class AdminRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async rejectStudentRegistration(studentId) {
        return await this.prisma.student.update({
            where: {
                id: studentId,
            },
            data: {
                registrationStatus: client_1.ApplicationStatus.rejected,
            },
        });
    }
    async rejectTutorRegistration(tutorId) {
        return await this.prisma.tutor.update({
            where: {
                id: tutorId,
            },
            data: {
                registrationStatus: client_1.ApplicationStatus.rejected,
            },
        });
    }
    async approveStudentRegistration(studentId) {
        return await this.prisma.student.update({
            where: {
                id: studentId,
            },
            data: {
                registrationStatus: client_1.ApplicationStatus.approved,
            },
        });
    }
    async approveTutorRegistration(tutorId) {
        return await this.prisma.tutor.update({
            where: {
                id: tutorId,
            },
            data: {
                registrationStatus: client_1.ApplicationStatus.approved,
            },
        });
    }
    async getPlacements(criteria) {
        return await this.prisma.placement.findMany({
            where: criteria,
            include: {
                tutor: true,
                student: true,
                monthlyReports: true,
            },
        });
    }
    async createPlacement(authorizationRequest, tutorId, studentId) {
        return await this.prisma.placement.create({
            data: {
                tutorId: tutorId,
                studentId: studentId,
                status: client_1.PlacementStatus.active,
                location: authorizationRequest.location,
                latitude: authorizationRequest.latitude,
                longitude: authorizationRequest.longitude,
                companyName: authorizationRequest.companyName,
                endDate: authorizationRequest.potentialEndDate,
                authorizationRequestId: authorizationRequest.id,
                companySector: authorizationRequest.companySector,
                startDate: authorizationRequest.potentialStartDate,
            },
        });
    }
    async getAuthorizationRequests(criteria) {
        return await this.prisma.authorizationRequest.findMany({
            where: criteria,
            include: {
                student: true,
            },
        });
    }
    async approveAuthorizationRequest(authorizationRequestId, data) {
        return await this.prisma.authorizationRequest.update({
            where: {
                id: authorizationRequestId,
            },
            data: Object.assign(Object.assign({}, data), { status: client_1.ApplicationStatus.approved }),
        });
    }
    async rejectAuthorizationRequest(authorizationRequestId, data) {
        return await this.prisma.authorizationRequest.update({
            where: {
                id: authorizationRequestId,
            },
            data: Object.assign(Object.assign({}, data), { status: client_1.ApplicationStatus.rejected }),
        });
    }
};
AdminRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminRepository);
exports.AdminRepository = AdminRepository;
//# sourceMappingURL=admin.repository.js.map