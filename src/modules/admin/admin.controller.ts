/* eslint-disable @typescript-eslint/no-empty-function */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminGuard } from './admin.guard';
import {
  AdminAuthInterceptor,
  ResponseTransformerInterceptor,
} from './admin.interceptor';
import { JoiValidationPipe } from './admin.pipe';
import {
  ApproveAuthorizationRequestSchema,
  ApproveRegistrationSchema,
  GetAuthorizationRequestsSchema,
  GetPlacementSchema,
  GetRegistrationsSchema,
  GetStudentSchema,
  GetTutorSchema,
  RejectAuthorizationRequestSchema,
  RejectRegistrationSchema,
} from './admin.schema';
import { AdminService } from './admin.service';

@UseGuards(AdminGuard)
@UseInterceptors(AdminAuthInterceptor)
@UseInterceptors(ResponseTransformerInterceptor)
@Controller('/admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get('/tutors')
  async getTutors(
    @Req() req,
    @Query(new JoiValidationPipe(GetTutorSchema)) query,
  ) {}

  @Get('/students')
  async getStudents(
    @Req() req,
    @Query(new JoiValidationPipe(GetStudentSchema)) query,
  ) {}

  @Get('/placements')
  async getPlacements(
    @Req() req,
    @Query(new JoiValidationPipe(GetPlacementSchema)) query,
  ) {}

  @Get('/registrations')
  async getRegistrations(
    @Req() req,
    @Query(new JoiValidationPipe(GetRegistrationsSchema)) query,
  ) {}

  @Post('/regisrations/:registrationId/approve')
  async approveRegistration(
    @Req() req,
    @Body(new JoiValidationPipe(ApproveRegistrationSchema.body)) body,
    @Param(new JoiValidationPipe(ApproveRegistrationSchema.params)) param,
  ) {}

  @Post('/regisrations/:registrationId/reject')
  async rejectRegistration(
    @Req() req,
    @Body(new JoiValidationPipe(RejectRegistrationSchema.body)) body,
    @Param(new JoiValidationPipe(RejectRegistrationSchema.params)) param,
  ) {}

  @Get('/authorization-requests')
  async getAuthorizationRequests(
    @Req() req,
    @Query(new JoiValidationPipe(GetAuthorizationRequestsSchema)) query,
  ) {}

  @Post('/authorization-requests/:authorizationRequestId/approve')
  async approveAuthorizationRequest(
    @Req() req,

    @Body(new JoiValidationPipe(ApproveAuthorizationRequestSchema.body)) body,

    @Param(new JoiValidationPipe(ApproveAuthorizationRequestSchema.params))
    param,
  ) {}

  @Post('/authorization-requests/:authorizationRequestId/reject')
  async rejectAuthorizationRequest(
    @Req() req,

    @Body(new JoiValidationPipe(RejectAuthorizationRequestSchema.body)) body,

    @Param(new JoiValidationPipe(RejectAuthorizationRequestSchema.params))
    param,
  ) {}
}
