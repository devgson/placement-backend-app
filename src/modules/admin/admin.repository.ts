import { Injectable } from '@nestjs/common';
import {
  ApplicationStatus,
  AuthorizationRequest,
  PlacementStatus,
  Prisma,
} from '@prisma/client';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private prisma: PrismaService) {}

  async rejectStudentRegistration(studentId: string) {
    return await this.prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        registrationStatus: ApplicationStatus.rejected,
      },
    });
  }

  async rejectTutorRegistration(tutorId: string) {
    return await this.prisma.tutor.update({
      where: {
        id: tutorId,
      },
      data: {
        registrationStatus: ApplicationStatus.rejected,
      },
    });
  }

  async approveStudentRegistration(studentId: string) {
    return await this.prisma.student.update({
      where: {
        id: studentId,
      },
      data: {
        registrationStatus: ApplicationStatus.approved,
      },
    });
  }

  async approveTutorRegistration(tutorId: string) {
    return await this.prisma.tutor.update({
      where: {
        id: tutorId,
      },
      data: {
        registrationStatus: ApplicationStatus.approved,
      },
    });
  }

  async getPlacements(criteria: Prisma.PlacementWhereInput) {
    return await this.prisma.placement.findMany({
      where: criteria,
      include: {
        tutor: true,
        student: true,
        monthlyReports: true,
      },
    });
  }

  async createPlacement(
    authorizationRequest: AuthorizationRequest,
    tutorId: string,
    studentId: string,
  ) {
    return await this.prisma.placement.create({
      data: {
        tutorId: tutorId,
        studentId: studentId,
        status: PlacementStatus.active,
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

  async approveAuthorizationRequest(
    authorizationRequestId: string,
    data: Prisma.AuthorizationRequestUpdateInput,
  ) {
    return await this.prisma.authorizationRequest.update({
      where: {
        id: authorizationRequestId,
      },
      data: {
        ...data,
        status: ApplicationStatus.approved,
      },
    });
  }

  async rejectAuthorizationRequest(
    authorizationRequestId: string,
    data: Prisma.AuthorizationRequestUpdateInput,
  ) {
    return await this.prisma.authorizationRequest.update({
      where: {
        id: authorizationRequestId,
      },
      data: {
        ...data,
        status: ApplicationStatus.rejected,
      },
    });
  }
}
