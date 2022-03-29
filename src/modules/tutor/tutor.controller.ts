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
import { GetTutorPlacementsDto, SchedulePlacementVisitDto } from './tutor.dto';
import { TutorGuard } from './tutor.guard';
import {
  ResponseTransformerInterceptor,
  TutorAuthInterceptor,
} from './tutor.interceptor';
import { JoiValidationPipe } from './tutor.pipe';
import {
  GetTutorPlacementsSchema,
  SchedulePlacementVisitSchema,
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

  @Post('/placements/:placementId/visit')
  async schedulePlacementVisit(
    @Req()
    req,

    @Body(new JoiValidationPipe(SchedulePlacementVisitSchema.body))
    body: SchedulePlacementVisitDto,

    @Param(new JoiValidationPipe(SchedulePlacementVisitSchema.params))
    param,
  ) {
    const placement = await this.tutorService.schedulePlacementVisit(
      req.user.id,
      param.placementId,
      body,
    );
    return {
      data: placement,
      message: 'Scheduled placement visit successfully',
    };
  }
}
