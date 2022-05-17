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
exports.StudentRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../services/prisma.service");
let StudentRepository = class StudentRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStudents(criteria) {
        return await this.prisma.student.findMany({
            where: criteria,
            include: {
                placements: {
                    include: {
                        tutor: true,
                        monthlyReports: true,
                    },
                },
            },
        });
    }
    async getStudent(criteria) {
        return await this.prisma.student.findFirst({
            where: criteria,
        });
    }
    async getPlacement(criteria) {
        return await this.prisma.placement.findFirst({
            where: criteria,
        });
    }
    async getStudentPlacements(studentId, criteria) {
        return await this.prisma.placement.findMany({
            where: Object.assign({ studentId }, criteria),
            include: {
                tutor: true,
                student: true,
                monthlyReports: true,
            },
        });
    }
    async getAuthorizationRequest(criteria) {
        return await this.prisma.authorizationRequest.findFirst({
            where: criteria,
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
    async deleteAuthorizationRequest(authorizationRequestId) {
        return await this.prisma.authorizationRequest.delete({
            where: {
                id: authorizationRequestId,
            },
        });
    }
    async createAuthorizationRequest(data) {
        return await this.prisma.authorizationRequest.create({
            data,
            include: { student: true },
        });
    }
    async createPlacementReport(data) {
        return await this.prisma.placementMonthlyReport.create({
            data,
            include: { placement: true },
        });
    }
};
StudentRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentRepository);
exports.StudentRepository = StudentRepository;
//# sourceMappingURL=student.repository.js.map