import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface Response {
  statusCode: number;
  message: string;
  data: any;
}
@Injectable()
export class ReponseTransformerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<Response> {
    return handler.handle().pipe(
      map((data: any) => {
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data.message,
          data: data.result,
        };
      }),
    );
  }
}
