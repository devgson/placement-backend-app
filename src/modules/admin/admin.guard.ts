import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from '../auth/auth.repository';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private authRepository: AuthRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization.replace('Bearer ', '');
    const admin = await this.authService.validateJWT(token).catch(() => {
      throw new UnauthorizedException('Invalid Token, please obtain a new one');
    });
    const adminExists = await this.authRepository.getAdmin({
      email: admin.email,
    });
    if (!adminExists) {
      throw new UnauthorizedException('Invalid Token, please obtain a new one');
    }
    return true;
  }
}
