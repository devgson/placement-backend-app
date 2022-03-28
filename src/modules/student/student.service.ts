import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ApplicationStatus, PlacementStatus, Prisma } from '@prisma/client';
import { FileService } from 'src/services/file/file.service';
import { CreatePlacementReportDto } from './dto/create-placement-report';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    private fileService: FileService,
    private studentRepository: StudentRepository,
  ) {}

  async getPlacements(studentId, status: PlacementStatus, placementId) {
    const query: Prisma.PlacementWhereInput = {};
    if (status) query.status = status;
    if (placementId) query.id = placementId;
    return await this.studentRepository.getPlacements({ studentId, ...query });
  }

  async getAuthorizationRequests(studentId, status, authorizationRequestId) {
    const query: Prisma.AuthorizationRequestWhereInput = {};
    if (status) query.status = status;
    if (authorizationRequestId) query.id = authorizationRequestId;
    return await this.studentRepository.getAuthorizationRequests({
      studentId,
      ...query,
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
