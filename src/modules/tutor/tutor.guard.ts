import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '../auth/auth.repository';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TutorGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private authRepository: AuthRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization.replace('Bearer ', '');
    await this.authService.validateJWT(token).catch(() => {
      throw new UnauthorizedException('Invalid Token, please obtain a new one');
    });
    const student = this.authRepository.getTutor({ email: token.email });
    if (!student) {
      throw new UnauthorizedException('Invalid Token, please obtain a new one');
    }
    return true;
  }
}
