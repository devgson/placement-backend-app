import { ScheduledVisitStatus, ScheduledVisitType } from '@prisma/client';

export class SchedulePlacementVisitDto {
  scheduledVisitDate: Date;
  scheduledVisitType: ScheduledVisitType;
}

export class SchedulePlacementVisitStatusDto {
  scheduledVisitStatus: ScheduledVisitStatus;
}

export class GetTutorPlacementsDto {
  id: string;
  status: string;
  scheduledVisit: boolean;
}
