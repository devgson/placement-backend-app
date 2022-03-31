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
  async getTutor(@Query(new JoiValidationPipe(GetTutorSchema)) query) {
    const tutors = await this.adminService.getTutors(query);
    return {
      data: tutors,
      message: 'Tutors retrieved successfully',
    };
  }

  @Get('/placements')
  async getPlacements(@Query(new JoiValidationPipe(GetPlacementSchema)) query) {
    const placements = await this.adminService.getPlacements(query);
    return {
      data: placements,
      message: 'Placements retrieved successfully',
    };
  }

  @Get('/registrations')
  async getRegistrations(
    @Query(new JoiValidationPipe(GetRegistrationsSchema)) query,
  ) {
    const registrations = await this.adminService.getRegistrations(query);
    return {
      data: registrations,
      message: 'Registrations retrieved successfully',
    };
  }

  @Post('/regisrations/:registrationId/approve')
  async approveRegistration(
    @Body(new JoiValidationPipe(ApproveRegistrationSchema.body)) body,
    @Param(new JoiValidationPipe(ApproveRegistrationSchema.params)) param,
  ) {
    const registration = await this.adminService.approveRegistration(
      param.registrationId,
      body.type,
    );
    return {
      data: registration,
      message: 'Registration approved successfully',
    };
  }

  @Post('/regisrations/:registrationId/reject')
  async rejectRegistration(
    @Body(new JoiValidationPipe(RejectRegistrationSchema.body)) body,
    @Param(new JoiValidationPipe(RejectRegistrationSchema.params)) param,
  ) {
    const registration = await this.adminService.rejectRegistration(
      param.registrationId,
      body.type,
    );
    return {
      data: registration,
      message: 'Registration rejected successfully',
    };
  }

  @Get('/authorization-requests')
  async getAuthorizationRequests(
    @Query(new JoiValidationPipe(GetAuthorizationRequestsSchema)) query,
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
    @Body(new JoiValidationPipe(ApproveAuthorizationRequestSchema.body)) body,

    @Param(new JoiValidationPipe(ApproveAuthorizationRequestSchema.params))
    param,
  ) {
    const authorizationRequest =
      await this.adminService.approveAuthorizationRequest(
        body,
        param.registrationId,
      );
    return {
      data: authorizationRequest,
      message: 'Authorization Request approved successfully',
    };
  }

  @Post('/authorization-requests/:authorizationRequestId/reject')
  async rejectAuthorizationRequest(
    @Body(new JoiValidationPipe(RejectAuthorizationRequestSchema.body)) body,

    @Param(new JoiValidationPipe(RejectAuthorizationRequestSchema.params))
    param,
  ) {
    const authorizationRequest =
      await this.adminService.rejectAuthorizationRequest(
        body,
        param.registrationId,
      );
    return {
      data: authorizationRequest,
      message: 'Authorization Request rejected successfully',
    };
  }
}
