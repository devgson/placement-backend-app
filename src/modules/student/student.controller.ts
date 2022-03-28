import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateAuthorizationRequestSchema,
  DeleteAuthorizationRequestSchema,
  GetAuthorizationRequestSchema,
  GetPlacementSchema,
  SubmitPlacementReportSchema,
} from './student.schema';
import { JoiValidationPipe } from './student.pipe';
import { StudentService } from './student.service';
import { StudentGuard } from './student.guard';
import {
  ResponseTransformerInterceptor,
  StudentAuthInterceptor,
} from './student.interceptor';
import { CreatePlacementReportDto } from './dto/create-placement-report';
import { CreateAuthorizationRequestDto } from './dto/create-authorization-request';

@UseGuards(StudentGuard)
@UseInterceptors(StudentAuthInterceptor)
@UseInterceptors(ResponseTransformerInterceptor)
@Controller('/students')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get('/placements')
  async getPlacements(
    @Req() req,
    @Query(new JoiValidationPipe(GetPlacementSchema)) query,
  ) {
    const placements = await this.studentService.getPlacements(
      req.user.id,
      query.status,
      query.id,
    );
    return {
      data: placements,
      message: 'Placements retrieved successfully',
    };
  }

  @Post('/placements/:placementId/report')
  async submitPlacementReport(
    @Req() req,

    @Body(new JoiValidationPipe(SubmitPlacementReportSchema.body))
    body,

    @Param(new JoiValidationPipe(SubmitPlacementReportSchema.params))
    param,

    @UploadedFile(new JoiValidationPipe(SubmitPlacementReportSchema.file))
    file: Express.Multer.File,
  ) {
    const report: CreatePlacementReportDto = {
      ...body,
      studentId: req.user.id,
      placementId: param.placementId,
    };
    const createdReport = await this.studentService.submitMonthlyReport(
      report,
      file,
    );
    return {
      data: createdReport,
      message: 'Submitted monthly placement report successfully',
    };
  }

  @Get('/authorization-requests')
  async getAuthorizationRequests(
    @Req() req,
    @Query(new JoiValidationPipe(GetAuthorizationRequestSchema)) query,
  ) {
    const authorizationRequests =
      await this.studentService.getAuthorizationRequests(
        req.user.id,
        query.status,
        query.id,
      );
    return {
      data: authorizationRequests,
      message: 'Authorization requests retrieved successfully',
    };
  }

  @Post('/authorization-requests')
  async createAuthorizationRequest(
    @Req() req,

    @Body(new JoiValidationPipe(CreateAuthorizationRequestSchema.body))
    body: CreateAuthorizationRequestDto,

    @UploadedFile(new JoiValidationPipe(CreateAuthorizationRequestSchema.file))
    file: Express.Multer.File,
  ) {
    const authorizationRequest =
      await this.studentService.createAuthorizationRequest(
        req.user.id,
        body,
        file,
      );
    return {
      data: authorizationRequest,
      message: 'Created authorization request successfully',
    };
  }

  @Delete('/authorization-requests/:authorizationRequestId')
  async deleteAuthorizationRequest(
    @Req() req,
    @Param(new JoiValidationPipe(DeleteAuthorizationRequestSchema)) param,
  ) {
    await this.studentService.deleteAuthorizationRequest(
      req.user.id,
      param.authorizationRequestId,
    );
    return {
      data: null,
      message: 'Deleted authorization request successfully',
    };
  }
}
