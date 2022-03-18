import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { RegisterTutorDto } from './dto/register-tutor.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register/student')
  async registerStudent(@Body() body: RegisterStudentDto) {
    return await this.authService.registerStudent(body);
  }

  @Post('/register/tutor')
  async registerTutor(@Body() body: RegisterTutorDto) {
    return await this.authService.registerTutor(body);
  }

  @Post('/login/tutor')
  async tutorLogin(@Body() body: { email: string; password: string }) {
    return await this.authService.tutorLogin(body.email, body.password);
  }

  @Post('/login/student')
  async studentLogin(@Body() body: { email: string; password: string }) {
    return await this.authService.studentLogin(body.email, body.password);
  }

  @Post('/login/admin')
  async adminLogIn(@Body() body: { email: string; password: string }) {
    return await this.authService.adminLogin(body.email, body.password);
  }
}
