import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
export declare class StudentRepository {
    private prisma;
    constructor(prisma: PrismaService);
    getStudents(criteria: Prisma.StudentWhereInput): Promise<(import(".prisma/client").Student & {
        placements: (import(".prisma/client").Placement & {
            monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
            tutor: import(".prisma/client").Tutor;
        })[];
    })[]>;
    getStudent(criteria: Prisma.StudentWhereInput): Promise<import(".prisma/client").Student>;
    getPlacement(criteria: Prisma.PlacementWhereInput): Promise<import(".prisma/client").Placement>;
    getStudentPlacements(studentId: string, criteria: Prisma.PlacementWhereInput): Promise<(import(".prisma/client").Placement & {
        monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
        tutor: import(".prisma/client").Tutor;
        student: import(".prisma/client").Student;
    })[]>;
    getAuthorizationRequest(criteria: Prisma.AuthorizationRequestWhereInput): Promise<import(".prisma/client").AuthorizationRequest>;
    getAuthorizationRequests(criteria: Prisma.AuthorizationRequestWhereInput): Promise<(import(".prisma/client").AuthorizationRequest & {
        student: import(".prisma/client").Student;
    })[]>;
    deleteAuthorizationRequest(authorizationRequestId: any): Promise<import(".prisma/client").AuthorizationRequest>;
    createAuthorizationRequest(data: Prisma.AuthorizationRequestCreateInput): Promise<import(".prisma/client").AuthorizationRequest & {
        student: import(".prisma/client").Student;
    }>;
    createPlacementReport(data: Prisma.PlacementMonthlyReportCreateInput): Promise<import(".prisma/client").PlacementMonthlyReport & {
        placement: import(".prisma/client").Placement;
    }>;
}
