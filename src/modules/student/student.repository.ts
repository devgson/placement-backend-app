import { Injectable } from '@nestjs/common';
import { ApplicationStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class StudentRepository {
  constructor(private prisma: PrismaService) {}

  async getStudents(criteria: Prisma.StudentWhereInput) {
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

  async getStudent(criteria: Prisma.StudentWhereInput) {
    return await this.prisma.student.findFirst({
      where: criteria,
    });
  }

  async getPlacement(criteria: Prisma.PlacementWhereInput) {
    return await this.prisma.placement.findFirst({
      where: criteria,
    });
  }

  async getStudentPlacements(
    studentId: string,
    criteria: Prisma.PlacementWhereInput,
  ) {
    return await this.prisma.placement.findMany({
      where: { studentId, ...criteria },
      include: {
        tutor: true,
        student: true,
        monthlyReports: true,
      },
    });
  }

  async getAuthorizationRequest(
    criteria: Prisma.AuthorizationRequestWhereInput,
  ) {
    return await this.prisma.authorizationRequest.findFirst({
      where: criteria,
    });
  }

  async getAuthorizationRequests(
    criteria: Prisma.AuthorizationRequestWhereInput,
  ) {
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

  async createAuthorizationRequest(
    data: Prisma.AuthorizationRequestCreateInput,
  ) {
    return await this.prisma.authorizationRequest.create({
      data,
      include: { student: true },
    });
  }

  async createPlacementReport(data: Prisma.PlacementMonthlyReportCreateInput) {
    return await this.prisma.placementMonthlyReport.create({
      data,
      include: { placement: true },
    });
  }
}
