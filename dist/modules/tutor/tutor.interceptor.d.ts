import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TutorRepository } from './tutor.repository';
export interface Response {
    statusCode: number;
    message: string;
    data: any;
}
export declare class TutorAuthInterceptor implements NestInterceptor {
    private authService;
    private tutorRepository;
    constructor(authService: AuthService, tutorRepository: TutorRepository);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
export declare class ResponseTransformerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<Response>;
}
