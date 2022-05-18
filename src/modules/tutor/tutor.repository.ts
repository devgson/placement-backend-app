import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../src/services/prisma.service';

@Injectable()
export class TutorRepository {
  constructor(private prisma: PrismaService) {}

  async getTutors(criteria: Prisma.TutorWhereInput) {
    return await this.prisma.tutor.findMany({
      where: criteria,
      include: {
        placements: {
          include: {
            student: true,
            monthlyReports: true,
          },
        },
      },
    });
  }

  async getTutor(criteria: Prisma.TutorWhereInput) {
    return await this.prisma.tutor.findFirst({
      where: criteria,
    });
  }

  async getTutorPlacements(
    tutorId: string,
    criteria: Prisma.PlacementWhereInput,
  ) {
    return this.prisma.placement.findMany({
      where: {
        tutorId,
        ...criteria,
      },
      include: {
        tutor: true,
        student: true,
        monthlyReports: true,
      },
    });
  }

  async updatePlacement(
    tutorId: string,
    placementId: string,
    data: Prisma.PlacementUpdateInput,
  ) {
    return this.prisma.placement.updateMany({
      data,
      where: { id: placementId, tutorId },
    });
  }
}
