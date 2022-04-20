import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  GetTutorPlacementsDto,
  SchedulePlacementVisitDto,
  SchedulePlacementVisitStatusDto,
} from './tutor.dto';
import { TutorGuard } from './tutor.guard';
import {
  ResponseTransformerInterceptor,
  TutorAuthInterceptor,
} from './tutor.interceptor';
import { JoiValidationPipe } from './tutor.pipe';
import {
  GetTutorPlacementsSchema,
  SchedulePlacementVisitSchema,
  SchedulePlacementVisitStatusSchema,
} from './tutor.schema';
import { TutorService } from './tutor.service';

@UseGuards(TutorGuard)
@UseInterceptors(TutorAuthInterceptor)
@UseInterceptors(ResponseTransformerInterceptor)
@Controller('/tutors')
export class TutorController {
  constructor(private tutorService: TutorService) {}

  @Get('/placements')
  async getTutorPlacements(
    @Req()
    req,

    @Query(new JoiValidationPipe(GetTutorPlacementsSchema))
    query: Partial<GetTutorPlacementsDto>,
  ) {
    const placements = await this.tutorService.getTutorPlacements(
      req.user.id,
      query,
    );
    return {
      data: placements,
      message: 'Tutor placements retrieved successfully',
    };
  }

  @Put('/placements/:placementId/visit')
  async schedulePlacementVisit(
    @Req()
    req,

    @Body(new JoiValidationPipe(SchedulePlacementVisitSchema.body))
    body: SchedulePlacementVisitDto,

    @Param(new JoiValidationPipe(SchedulePlacementVisitSchema.params))
    param,
  ) {
    const placement = await this.tutorService.updatePlacement(
      req.user.id,
      param.placementId,
      body,
    );
    return {
      data: placement,
      message: 'Scheduled placement visit successfully',
    };
  }

  @Put('/placements/:placementId/visit/status')
  async setScheduledVisitStatus(
    @Req()
    req,

    @Body(new JoiValidationPipe(SchedulePlacementVisitStatusSchema.body))
    body: SchedulePlacementVisitStatusDto,

    @Param(new JoiValidationPipe(SchedulePlacementVisitStatusSchema.params))
    param,
  ) {
    const placement = await this.tutorService.updatePlacement(
      req.user.id,
      param.placementId,
      body,
    );
    return {
      data: placement,
      message: 'Updated placement visit successfully',
    };
  }
}
