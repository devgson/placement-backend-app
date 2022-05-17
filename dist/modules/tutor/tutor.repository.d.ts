import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
export declare class TutorRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getTutors(criteria: Prisma.TutorWhereInput): Promise<(import(".prisma/client").Tutor & {
        placements: (import(".prisma/client").Placement & {
            monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
            student: import(".prisma/client").Student;
        })[];
    })[]>;
    getTutor(criteria: Prisma.TutorWhereInput): Promise<import(".prisma/client").Tutor>;
    getTutorPlacements(tutorId: string, criteria: Prisma.PlacementWhereInput): Promise<(import(".prisma/client").Placement & {
        monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
        tutor: import(".prisma/client").Tutor;
        student: import(".prisma/client").Student;
    })[]>;
    updatePlacement(tutorId: string, placementId: string, data: Prisma.PlacementUpdateInput): Promise<Prisma.BatchPayload>;
}
