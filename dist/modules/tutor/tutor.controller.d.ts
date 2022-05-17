import { GetTutorPlacementsDto, SchedulePlacementVisitDto, SchedulePlacementVisitStatusDto } from './tutor.dto';
import { TutorService } from './tutor.service';
export declare class TutorController {
    private tutorService;
    constructor(tutorService: TutorService);
    getTutorPlacements(req: any, query: Partial<GetTutorPlacementsDto>): Promise<{
        data: (import(".prisma/client").Placement & {
            monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
            tutor: import(".prisma/client").Tutor;
            student: import(".prisma/client").Student;
        })[];
        message: string;
    }>;
    schedulePlacementVisit(req: any, body: SchedulePlacementVisitDto, param: any): Promise<{
        data: import(".prisma/client").Prisma.BatchPayload;
        message: string;
    }>;
    setScheduledVisitStatus(req: any, body: SchedulePlacementVisitStatusDto, param: any): Promise<{
        data: import(".prisma/client").Prisma.BatchPayload;
        message: string;
    }>;
}
