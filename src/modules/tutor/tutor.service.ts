import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { TutorRepository } from './tutor.repository';
import { ScheduledVisitStatus } from '@prisma/client';
import { GetTutorPlacementsDto } from './tutor.dto';

@Injectable()
export class TutorService {
  constructor(private tutorRepository: TutorRepository) {}

  async getTutorPlacements(
    tutorId: string,
    query: Partial<GetTutorPlacementsDto>,
  ) {
    const criteria: Prisma.PlacementWhereInput = {};
    if (query.id) criteria.id = query.id;
    if (query.scheduledVisit) criteria.scheduledVisitDate !== null;
    if (query.status) criteria.status = ScheduledVisitStatus[query.status];
    return this.tutorRepository.getTutorPlacements(tutorId, criteria);
  }

  async updatePlacement<T>(tutorId: string, placementId: string, data: T) {
    return this.tutorRepository.updatePlacement(tutorId, placementId, data);
  }
}
