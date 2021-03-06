import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ApplicationStatus, PlacementStatus, Prisma } from '@prisma/client';
import { FileService } from '../../services/file.service';
import { CreateAuthorizationRequestDto } from './dto/create-authorization-request';
import { CreatePlacementReportDto } from './dto/create-placement-report';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    private fileService: FileService,
    private studentRepository: StudentRepository,
  ) {}

  async getPlacements(studentId, status: PlacementStatus, placementId) {
    const criteria: Prisma.PlacementWhereInput = {};
    if (status) criteria.status = status;
    if (placementId) criteria.id = placementId;
    return await this.studentRepository.getStudentPlacements(
      studentId,
      criteria,
    );
  }

  async getAuthorizationRequests(studentId, status, authorizationRequestId) {
    const criteria: Prisma.AuthorizationRequestWhereInput = {};
    if (status) criteria.status = status;
    if (authorizationRequestId) criteria.id = authorizationRequestId;
    return await this.studentRepository.getAuthorizationRequests({
      studentId,
      ...criteria,
    });
  }

  async deleteAuthorizationRequest(studentId, authorizationRequestId) {
    const authorizationRequest =
      await this.studentRepository.getAuthorizationRequest({
        studentId,
        id: authorizationRequestId,
        status: ApplicationStatus.pending,
      });
    if (!authorizationRequest) {
      throw new UnauthorizedException('You cannot perform such action');
    }
    return await this.studentRepository.deleteAuthorizationRequest(
      authorizationRequest.id,
    );
  }

  async createAuthorizationRequest(
    studentId: string,
    authorizationRequest: CreateAuthorizationRequestDto,
    file: Express.Multer.File,
  ) {
    const uploadedFile = await this.fileService.uploadFile(file);
    return await this.studentRepository.createAuthorizationRequest({
      ...authorizationRequest,
      requestForm: uploadedFile.secure_url,
      student: {
        connect: { id: studentId },
      },
    });
  }

  async submitMonthlyReport(
    placementReport: CreatePlacementReportDto,
    file: Express.Multer.File,
  ) {
    const placement = await this.studentRepository.getPlacement({
      status: PlacementStatus.active,
      id: placementReport.placementId,
      studentId: placementReport.studentId,
    });
    if (!placement) {
      throw new UnauthorizedException('You cannot perform such action');
    }
    const uploadedFile = await this.fileService.uploadFile(file);
    return await this.studentRepository.createPlacementReport({
      month: placementReport.month,
      rating: placementReport.rating,
      report: uploadedFile.secure_url,
      placement: {
        connect: { id: placement.id },
      },
    });
  }
}
