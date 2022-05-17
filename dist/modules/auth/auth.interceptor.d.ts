import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface Response {
    statusCode: number;
    message: string;
    data: any;
}
export declare class ResponseTransformerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<Response>;
}
