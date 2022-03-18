import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async registerStudent(data) {
    return await this.prisma.student.create({
      data,
    });
  }

  async registerTutor(data) {
    return await this.prisma.tutor.create({ data });
  }

  async getStudent(email: string, password: string) {
    return await this.prisma.student.findFirst({
      where: { email, password },
    });
  }

  async getTutor(email: string, password: string) {
    return await this.prisma.tutor.findFirst({
      where: { email, password },
    });
  }

  async getAdmin(email: string, password: string) {
    return await this.prisma.admin.findFirst({
      where: { email, password },
    });
  }
}
