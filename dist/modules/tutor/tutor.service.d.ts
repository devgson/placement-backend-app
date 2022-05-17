import { Prisma } from '@prisma/client';
import { TutorRepository } from './tutor.repository';
import { GetTutorPlacementsDto } from './tutor.dto';
export declare class TutorService {
    private tutorRepository;
    constructor(tutorRepository: TutorRepository);
    getTutorPlacements(tutorId: string, query: Partial<GetTutorPlacementsDto>): Promise<(import(".prisma/client").Placement & {
        monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
        tutor: import(".prisma/client").Tutor;
        student: import(".prisma/client").Student;
    })[]>;
    updatePlacement<T>(tutorId: string, placementId: string, data: T): Promise<Prisma.BatchPayload>;
}
