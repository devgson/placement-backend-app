import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { TutorRepository } from './tutor.repository';

export interface Response {
  statusCode: number;
  message: string;
  data: any;
}

@Injectable()
export class TutorAuthInterceptor implements NestInterceptor {
  constructor(
    private authService: AuthService,
    private tutorRepository: TutorRepository,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const jwt = request.headers?.authorization.replace('Bearer ', '');
    const token = await this.authService.validateJWT(jwt);
    const tutor = await this.tutorRepository.getTutor({
      email: token.email,
    });
    request.user = tutor;
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
