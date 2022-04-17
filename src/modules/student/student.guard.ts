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
    const student = await this.authService.validateJWT(token).catch(() => {
      throw new UnauthorizedException('Invalid Token, please obtain a new one');
    });
    const studentExists = await this.studentRepository.getStudent({
      email: student.email,
    });
    if (!studentExists) {
      throw new UnauthorizedException('Invalid Token, please obtain a new one');
    }
    return true;
  }
}
