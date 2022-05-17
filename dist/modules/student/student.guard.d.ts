import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { StudentRepository } from './student.repository';
export declare class StudentGuard implements CanActivate {
    private authService;
    private studentRepository;
    constructor(authService: AuthService, studentRepository: StudentRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
