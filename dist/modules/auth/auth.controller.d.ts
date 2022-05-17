/// <reference types="multer" />
import { AuthService } from './auth.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { RegisterTutorDto } from './dto/register-tutor.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    registerStudent(body: RegisterStudentDto, file: Express.Multer.File): Promise<{
        data: import(".prisma/client").Student;
        message: string;
    }>;
    registerTutor(body: RegisterTutorDto, file: Express.Multer.File): Promise<{
        data: import(".prisma/client").Tutor;
        message: string;
    }>;
    tutorLogin(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        data: string;
    }>;
    studentLogin(body: {
        email: string;
        password: string;
    }): Promise<{
        data: string;
        message: string;
    }>;
    adminLogIn(body: any): Promise<{
        data: string;
        message: string;
    }>;
}
