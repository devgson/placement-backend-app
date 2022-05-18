import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../services/prisma.service';
import { StudentRepository } from '../student/student.repository';
import { TutorRepository } from '../tutor/tutor.repository';
import {
  GetTutorDto,
  GetPlacementDto,
  ApproveRegistrationDto,
  GetRegistrationsDto,
  RejectRegistrationDto,
  ApproveAuthorizationRequestDto,
  GetAuthorizationRequestsDto,
  RejectAuthorizationRequestDto,
} from './admin.dto';
import { AdminRepository } from './admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private adminRepository: AdminRepository,
    private tutorRepository: TutorRepository,
    private studentRepository: StudentRepository,
  ) {}

  async getTutors(query: GetTutorDto) {
    return this.tutorRepository.getTutors(query);
  }

  async getPlacements(query: GetPlacementDto) {
    return await this.adminRepository.getPlacements(query);
  }

  async getRegistrations(query: GetRegistrationsDto) {
    switch (query.type) {
      case 'tutor':
        return await this.tutorRepository.getTutors(query);
      case 'student':
        return await this.studentRepository.getStudents(query);
      default:
        return (
          await Promise.all([
            this.tutorRepository.getTutors(query),
            this.studentRepository.getStudents(query),
          ])
        ).flat();
    }
  }

  async approveRegistration(
    registrationId,
    type: ApproveRegistrationDto['type'],
  ) {
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

  async rejectRegistration(
    registrationId,
    type: RejectRegistrationDto['type'],
  ) {
    if (type === 'student') {
      return await this.adminRepository.rejectStudentRegistration(
        registrationId,
      );
    }
    if (type === 'tutor') {
      return await this.adminRepository.rejectTutorRegistration(registrationId);
    }
  }

  async getAuthorizationRequests(query: GetAuthorizationRequestsDto) {
    return await this.adminRepository.getAuthorizationRequests(query);
  }

  async approveAuthorizationRequest(
    data: ApproveAuthorizationRequestDto,
    authorizationRequestId,
  ) {
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

  async rejectAuthorizationRequest(
    data: RejectAuthorizationRequestDto,
    authorizationRequestId,
  ) {
    return await this.adminRepository.rejectAuthorizationRequest(
      authorizationRequestId,
      {
        adminComment: data.comment,
      },
    );
  }
}
