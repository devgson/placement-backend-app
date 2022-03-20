import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class SignPayloadInterceptor implements NestInterceptor {
  constructor(private authService: AuthService) {}

  async intercept(
    context: ExecutionContext,
    handler: CallHandler,
  ): Promise<Observable<any>> {
    return handler.handle().pipe(
      map((data: any) => {
        delete data.password;
        return this.authService.generateJWT(data);
      }),
    );
  }
}
