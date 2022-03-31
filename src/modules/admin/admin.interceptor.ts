import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AuthRepository } from '../auth/auth.repository';
import { AuthService } from '../auth/auth.service';

export interface Response {
  statusCode: number;
  message: string;
  data: any;
}

@Injectable()
export class AdminAuthInterceptor implements NestInterceptor {
  constructor(
    private authService: AuthService,
    private authRepository: AuthRepository,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const jwt = request.headers?.authorization.replace('Bearer ', '');
    const token = await this.authService.validateJWT(jwt);
    const admin = await this.authRepository.getAdmin({ email: token.email });
    request.user = admin;
    return next.handle();
  }
}

@Injectable()
export class ResponseTransformerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Observable<Response> {
    return handler.handle().pipe(
      map((data: any) => {
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: data.message,
          data: data.data,
        };
      }),
    );
  }
}
