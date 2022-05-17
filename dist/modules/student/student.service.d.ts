/// <reference types="multer" />
import { PlacementStatus } from '@prisma/client';
import { FileService } from 'src/services/file.service';
import { CreateAuthorizationRequestDto } from './dto/create-authorization-request';
import { CreatePlacementReportDto } from './dto/create-placement-report';
import { StudentRepository } from './student.repository';
export declare class StudentService {
    private fileService;
    private studentRepository;
    constructor(fileService: FileService, studentRepository: StudentRepository);
    getPlacements(studentId: any, status: PlacementStatus, placementId: any): Promise<(import(".prisma/client").Placement & {
        monthlyReports: import(".prisma/client").PlacementMonthlyReport[];
        tutor: import(".prisma/client").Tutor;
        student: import(".prisma/client").Student;
    })[]>;
    getAuthorizationRequests(studentId: any, status: any, authorizationRequestId: any): Promise<(import(".prisma/client").AuthorizationRequest & {
        student: import(".prisma/client").Student;
    })[]>;
    deleteAuthorizationRequest(studentId: any, authorizationRequestId: any): Promise<import(".prisma/client").AuthorizationRequest>;
    createAuthorizationRequest(studentId: string, authorizationRequest: CreateAuthorizationRequestDto, file: Express.Multer.File): Promise<import(".prisma/client").AuthorizationRequest & {
        student: import(".prisma/client").Student;
    }>;
    submitMonthlyReport(placementReport: CreatePlacementReportDto, file: Express.Multer.File): Promise<import(".prisma/client").PlacementMonthlyReport & {
        placement: import(".prisma/client").Placement;
    }>;
}
