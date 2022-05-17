import { AuthorizationRequest, Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
export declare class AdminRepository {
    private prisma;
    constructor(prisma: PrismaService);
    rejectStudentRegistration(studentId: string): Promise<import(".prisma/client").Student>;
    rejectTutorRegistration(tutorId: string): Promise<import(".prisma/client").Tutor>;
    approveStudentRegistration(studentId: string): Promise<import(".prisma/client").Student>;
    approveTutorRegistration(tutorId: string): Promise<import(".prisma/client").Tutor>;
    getPlacements(criteria: Prisma.PlacementWhereInput): Promise<(import(".prisma/client").Placement & {
        monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
        tutor: import(".prisma/client").Tutor;
        student: import(".prisma/client").Student;
    })[]>;
    createPlacement(authorizationRequest: AuthorizationRequest, tutorId: string, studentId: string): Promise<import(".prisma/client").Placement>;
    getAuthorizationRequests(criteria: Prisma.AuthorizationRequestWhereInput): Promise<(AuthorizationRequest & {
        student: import(".prisma/client").Student;
    })[]>;
    approveAuthorizationRequest(authorizationRequestId: string, data: Prisma.AuthorizationRequestUpdateInput): Promise<AuthorizationRequest>;
    rejectAuthorizationRequest(authorizationRequestId: string, data: Prisma.AuthorizationRequestUpdateInput): Promise<AuthorizationRequest>;
}
