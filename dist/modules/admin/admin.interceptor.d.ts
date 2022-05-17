import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthRepository } from '../auth/auth.repository';
import { AuthService } from '../auth/auth.service';
export interface Response {
    statusCode: number;
    message: string;
    data: any;
}
export declare class AdminAuthInterceptor implements NestInterceptor {
    private authService;
    private authRepository;
    constructor(authService: AuthService, authRepository: AuthRepository);
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
export declare class ResponseTransformerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<Response>;
}
