import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { StudentRepository } from './student.repository';
export interface Response {
    statusCode: number;
    message: string;
    data: any;
}
export declare class StudentAuthInterceptor implements NestInterceptor {
    private authService;
    private studentRepository;
    constructor(authService: AuthService, studentRepository: StudentRepository);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
export declare class ResponseTransformerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<Response>;
}
