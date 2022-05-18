import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../../src/services/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async registerStudent(data: Prisma.StudentCreateInput) {
    return await this.prisma.student.create({ data });
  }

  async registerTutor(data: Prisma.TutorCreateInput) {
    return await this.prisma.tutor.create({ data });
  }

  async getStudent(criteria: Prisma.StudentWhereInput) {
    return await this.prisma.student.findFirst({
      where: criteria,
    });
  }

  async getTutor(criteria: Prisma.TutorWhereInput) {
    return await this.prisma.tutor.findFirst({
      where: criteria,
    });
  }

  async getAdmin(criteria: Prisma.AdminWhereInput) {
    return await this.prisma.admin.findFirst({
      where: criteria,
    });
  }
}
