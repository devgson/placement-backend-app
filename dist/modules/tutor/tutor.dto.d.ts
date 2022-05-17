import { ScheduledVisitStatus, ScheduledVisitType } from '@prisma/client';
export declare class SchedulePlacementVisitDto {
    scheduledVisitDate: Date;
    scheduledVisitType: ScheduledVisitType;
}
export declare class SchedulePlacementVisitStatusDto {
    scheduledVisitStatus: ScheduledVisitStatus;
}
export declare class GetTutorPlacementsDto {
    id: string;
    status: string;
    scheduledVisit: boolean;
}
