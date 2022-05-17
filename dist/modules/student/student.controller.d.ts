/// <reference types="multer" />
import { StudentService } from './student.service';
import { CreateAuthorizationRequestDto } from './dto/create-authorization-request';
export declare class StudentController {
    private studentService;
    constructor(studentService: StudentService);
    getPlacements(req: any, query: any): Promise<{
        data: (import(".prisma/client").Placement & {
            monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
            tutor: import(".prisma/client").Tutor;
            student: import(".prisma/client").Student;
        })[];
        message: string;
    }>;
    submitPlacementReport(req: any, body: any, param: any, file: Express.Multer.File): Promise<{
        data: import(".prisma/client").PlacementMonthlyReport & {
            placement: import(".prisma/client").Placement;
        };
        message: string;
    }>;
    getAuthorizationRequests(req: any, query: any): Promise<{
        data: (import(".prisma/client").AuthorizationRequest & {
            student: import(".prisma/client").Student;
        })[];
        message: string;
    }>;
    createAuthorizationRequest(req: any, body: CreateAuthorizationRequestDto, file: Express.Multer.File): Promise<{
        data: import(".prisma/client").AuthorizationRequest & {
            student: import(".prisma/client").Student;
        };
        message: string;
    }>;
    deleteAuthorizationRequest(req: any, param: any): Promise<{
        data: any;
        message: string;
    }>;
}
