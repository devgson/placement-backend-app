import { PrismaService } from 'src/services/prisma.service';
import { StudentRepository } from '../student/student.repository';
import { TutorRepository } from '../tutor/tutor.repository';
import { GetTutorDto, GetPlacementDto, ApproveRegistrationDto, GetRegistrationsDto, RejectRegistrationDto, ApproveAuthorizationRequestDto, GetAuthorizationRequestsDto, RejectAuthorizationRequestDto } from './admin.dto';
import { AdminRepository } from './admin.repository';
export declare class AdminService {
    private prisma;
    private adminRepository;
    private tutorRepository;
    private studentRepository;
    constructor(prisma: PrismaService, adminRepository: AdminRepository, tutorRepository: TutorRepository, studentRepository: StudentRepository);
    getTutors(query: GetTutorDto): Promise<(import(".prisma/client").Tutor & {
        placements: (import(".prisma/client").Placement & {
            monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
            student: import(".prisma/client").Student;
        })[];
    })[]>;
    getPlacements(query: GetPlacementDto): Promise<(import(".prisma/client").Placement & {
        monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
        tutor: import(".prisma/client").Tutor;
        student: import(".prisma/client").Student;
    })[]>;
    getRegistrations(query: GetRegistrationsDto): Promise<((import(".prisma/client").Tutor & {
        placements: (import(".prisma/client").Placement & {
            monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
            student: import(".prisma/client").Student;
        })[];
    }) | (import(".prisma/client").Student & {
        placements: (import(".prisma/client").Placement & {
            monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
            tutor: import(".prisma/client").Tutor;
        })[];
    }))[]>;
    approveRegistration(registrationId: any, type: ApproveRegistrationDto['type']): Promise<import(".prisma/client").Student | import(".prisma/client").Tutor>;
    rejectRegistration(registrationId: any, type: RejectRegistrationDto['type']): Promise<import(".prisma/client").Student | import(".prisma/client").Tutor>;
    getAuthorizationRequests(query: GetAuthorizationRequestsDto): Promise<(import(".prisma/client").AuthorizationRequest & {
        student: import(".prisma/client").Student;
    })[]>;
    approveAuthorizationRequest(data: ApproveAuthorizationRequestDto, authorizationRequestId: any): Promise<import(".prisma/client").Placement>;
    rejectAuthorizationRequest(data: RejectAuthorizationRequestDto, authorizationRequestId: any): Promise<import(".prisma/client").AuthorizationRequest>;
}
