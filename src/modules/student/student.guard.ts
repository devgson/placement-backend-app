import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private studentRepository: StudentRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization.replace('Bearer ', '');
    await this.authService.validateJWT(token).catch(() => {
      throw new UnauthorizedException('Invalid Token, please obtain a new one');
    });
    const student = this.studentRepository.getStudent({ email: token.email });
    if (!student) {
      throw new UnauthorizedException('Invalid Token, please obtain a new one');
    }
    return true;
  }
}