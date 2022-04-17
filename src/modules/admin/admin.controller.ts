import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApproveAuthorizationRequestDto,
  ApproveRegistrationDto,
  GetAuthorizationRequestsDto,
  GetPlacementDto,
  GetRegistrationsDto,
  GetTutorDto,
  RejectAuthorizationRequestDto,
  RejectRegistrationDto,
} from './admin.dto';
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
  async getTutor(
    @Query(new JoiValidationPipe(GetTutorSchema)) query: GetTutorDto,
  ) {
    const tutors = await this.adminService.getTutors(query);
    return {
      data: tutors,
      message: 'Tutors retrieved successfully',
    };
  }

  @Get('/placements')
  async getPlacements(
    @Query(new JoiValidationPipe(GetPlacementSchema)) query: GetPlacementDto,
  ) {
    const placements = await this.adminService.getPlacements(query);
    return {
      data: placements,
      message: 'Placements retrieved successfully',
    };
  }

  @Get('/registrations')
  async getRegistrations(
    @Query(new JoiValidationPipe(GetRegistrationsSchema))
    query: GetRegistrationsDto,
  ) {
    const registrations = await this.adminService.getRegistrations(query);
    return {
      data: registrations,
      message: 'Registrations retrieved successfully',
    };
  }

  @Post('/registrations/:registrationId/approve')
  async approveRegistration(
    @Body(new JoiValidationPipe(ApproveRegistrationSchema.body))
    body: ApproveRegistrationDto,

    @Param(new JoiValidationPipe(ApproveRegistrationSchema.params))
    params,
  ) {
    const registration = await this.adminService.approveRegistration(
      params.registrationId,
      body.type,
    );
    return {
      data: registration,
      message: 'Registration approved successfully',
    };
  }

  @Post('/registrations/:registrationId/reject')
  async rejectRegistration(
    @Body(new JoiValidationPipe(RejectRegistrationSchema.body))
    body: RejectRegistrationDto,

    @Param(new JoiValidationPipe(RejectRegistrationSchema.params))
    params,
  ) {
    const registration = await this.adminService.rejectRegistration(
      params.registrationId,
      body.type,
    );
    return {
      data: registration,
      message: 'Registration rejected successfully',
    };
  }

  @Get('/authorization-requests')
  async getAuthorizationRequests(
    @Query(new JoiValidationPipe(GetAuthorizationRequestsSchema))
    query: GetAuthorizationRequestsDto,
  ) {
    const authorizationRequests =
      await this.adminService.getAuthorizationRequests(query);
    return {
      data: authorizationRequests,
      message: 'Authorization Requests retrieved successfully',
    };
  }

  @Post('/authorization-requests/:authorizationRequestId/approve')
  async approveAuthorizationRequest(
    @Body(new JoiValidationPipe(ApproveAuthorizationRequestSchema.body))
    body: ApproveAuthorizationRequestDto,

    @Param(new JoiValidationPipe(ApproveAuthorizationRequestSchema.params))
    params,
  ) {
    const authorizationRequest =
      await this.adminService.approveAuthorizationRequest(
        body,
        params.authorizationRequestId,
      );
    return {
      data: authorizationRequest,
      message: 'Authorization Request approved successfully',
    };
  }

  @Post('/authorization-requests/:authorizationRequestId/reject')
  async rejectAuthorizationRequest(
    @Body(new JoiValidationPipe(RejectAuthorizationRequestSchema.body))
    body: RejectAuthorizationRequestDto,

    @Param(new JoiValidationPipe(RejectAuthorizationRequestSchema.params))
    params,
  ) {
    const authorizationRequest =
      await this.adminService.rejectAuthorizationRequest(
        body,
        params.authorizationRequestId,
      );
    return {
      data: authorizationRequest,
      message: 'Authorization Request rejected successfully',
    };
  }
}
