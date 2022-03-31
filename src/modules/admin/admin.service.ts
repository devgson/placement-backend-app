import { Injectable } from '@nestjs/common';
import { ApplicationStatus, PlacementStatus } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { StudentRepository } from '../student/student.repository';
import { TutorRepository } from '../tutor/tutor.repository';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private adminRepository: AdminRepository,
    private tutorRepository: TutorRepository,
    private studentRepository: StudentRepository,
  ) {}

  async getTutors(query) {
    const criteria: any = {};
    if (query.id) criteria.id = query.id;
    if (query.status) criteria.status = ApplicationStatus[query.status];
    return this.tutorRepository.getTutors(criteria);
  }

  async getPlacements(query) {
    const criteria: any = {};
    if (query.id) criteria.id = query.id;
    if (query.status) criteria.status = PlacementStatus[query.status];
    return await this.adminRepository.getPlacements(query);
  }

  async getRegistrations(query) {
    const criteria: any = {
      status: ApplicationStatus.pending,
    };
    if (query.id) criteria.id = query.id;
    if (query.status) criteria.status = ApplicationStatus[query.status];
    switch (query.type) {
      case 'tutor':
        return await this.tutorRepository.getTutors(criteria);
      case 'student':
        return await this.studentRepository.getStudents(criteria);
      default:
        return await Promise.all([
          this.tutorRepository.getTutors(criteria),
          this.studentRepository.getStudents(criteria),
        ]);
    }
  }

  async approveRegistration(registrationId, type) {
    if (type === 'student') {
      return await this.adminRepository.approveStudentRegistration(
        registrationId,
      );
    }
    if (type === 'tutor') {
      return await this.adminRepository.approveTutorRegistration(
        registrationId,
      );
    }
  }

  async rejectRegistration(registrationId, type) {
    if (type === 'student') {
      return await this.adminRepository.rejectStudentRegistration(
        registrationId,
      );
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
      const request = await this.adminRepository.approveAuthorizationRequest(
        authorizationRequestId,
        {
          adminComment: data.comment,
        },
      );
      return await this.adminRepository.createPlacement(
        request,
        data.tutorId,
        request.studentId,
      );
    });
  }

  async rejectAuthorizationRequest(data, authorizationRequestId) {
    return await this.adminRepository.rejectAuthorizationRequest(
      authorizationRequestId,
      {
        adminComment: data.comment,
      },
    );
  }
}
