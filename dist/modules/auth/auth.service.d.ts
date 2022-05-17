/// <reference types="multer" />
import { AuthRepository } from './auth.repository';
import { RegisterStudentDto } from './dto/register-student.dto';
import { FileService } from 'src/services/file.service';
import { RegisterTutorDto } from './dto/register-tutor.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private authRepository;
    private fileService;
    private jwtService;
    constructor(authRepository: AuthRepository, fileService: FileService, jwtService: JwtService);
    generateJWT(payload: any): Promise<string>;
    validateJWT(token: any): Promise<any>;
    adminLogin(email: string, password: string): Promise<string>;
    studentLogin(email: string, password: string): Promise<string>;
    tutorLogin(email: string, password: string): Promise<string>;
    registerStudent(student: RegisterStudentDto, file: Express.Multer.File): Promise<import(".prisma/client").Student>;
    registerTutor(tutor: RegisterTutorDto, file: Express.Multer.File): Promise<import(".prisma/client").Tutor>;
}
