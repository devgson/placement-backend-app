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
    const tutor = await this.authService.validateJWT(token).catch(() => {
      throw new UnauthorizedException('Invalid Token, please obtain a new one');
    });
    const tutorExists = await this.authRepository.getTutor({
      email: tutor.email,
    });
    if (!tutorExists) {
      throw new UnauthorizedException('Invalid Token, please obtain a new one');
    }
    return true;
  }
}
