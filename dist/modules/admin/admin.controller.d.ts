import { ApproveAuthorizationRequestDto, ApproveRegistrationDto, GetAuthorizationRequestsDto, GetPlacementDto, GetRegistrationsDto, GetTutorDto, RejectAuthorizationRequestDto, RejectRegistrationDto } from './admin.dto';
import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    getTutor(query: GetTutorDto): Promise<{
        data: (import(".prisma/client").Tutor & {
            placements: (import(".prisma/client").Placement & {
                monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
                student: import(".prisma/client").Student;
            })[];
        })[];
        message: string;
    }>;
    getPlacements(query: GetPlacementDto): Promise<{
        data: (import(".prisma/client").Placement & {
            monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
            tutor: import(".prisma/client").Tutor;
            student: import(".prisma/client").Student;
        })[];
        message: string;
    }>;
    getRegistrations(query: GetRegistrationsDto): Promise<{
        data: ((import(".prisma/client").Tutor & {
            placements: (import(".prisma/client").Placement & {
                monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
                student: import(".prisma/client").Student;
            })[];
        }) | (import(".prisma/client").Student & {
            placements: (import(".prisma/client").Placement & {
                monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
                tutor: import(".prisma/client").Tutor;
            })[];
        }))[];
        message: string;
    }>;
    approveRegistration(body: ApproveRegistrationDto, params: any): Promise<{
        data: import(".prisma/client").Student | import(".prisma/client").Tutor;
        message: string;
    }>;
    rejectRegistration(body: RejectRegistrationDto, params: any): Promise<{
        data: import(".prisma/client").Student | import(".prisma/client").Tutor;
        message: string;
    }>;
    getAuthorizationRequests(query: GetAuthorizationRequestsDto): Promise<{
        data: (import(".prisma/client").AuthorizationRequest & {
            student: import(".prisma/client").Student;
        })[];
        message: string;
    }>;
    approveAuthorizationRequest(body: ApproveAuthorizationRequestDto, params: any): Promise<{
        data: import(".prisma/client").Placement;
        message: string;
    }>;
    rejectAuthorizationRequest(body: RejectAuthorizationRequestDto, params: any): Promise<{
        data: import(".prisma/client").AuthorizationRequest;
        message: string;
    }>;
}
