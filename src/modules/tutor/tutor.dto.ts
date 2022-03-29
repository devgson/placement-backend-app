import { ScheduledVisitType } from '@prisma/client';

export class SchedulePlacementVisitDto {
  scheduledVisitDate: Date;
  scheduledVisitType: ScheduledVisitType;
}

export class GetTutorPlacementsDto {
  id: string;
  status: string;
  scheduledVisit: boolean;
}
