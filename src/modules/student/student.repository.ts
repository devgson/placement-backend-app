import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class StudentRepository {
  constructor(private prisma: PrismaService) {}

  async getPlacement(criteria: Prisma.PlacementWhereInput) {
    return await this.prisma.placement.findFirst({
      where: criteria,
    });
  }

  async getPlacements(criteria: Prisma.PlacementWhereInput) {
    return await this.prisma.placement.findMany({
      where: criteria,
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
