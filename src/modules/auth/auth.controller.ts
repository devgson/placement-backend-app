import {
  Body,
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SignPayloadInterceptor } from './auth.interceptor';
import { JoiValidationPipe } from './auth.pipe';
import { LoginSchema, RegisterStudentSchema } from './auth.schema';
import { AuthService } from './auth.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { RegisterTutorDto } from './dto/register-tutor.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register/student')
  @UseInterceptors(FileInterceptor('universityId'))
  async registerStudent(
    @Body(new JoiValidationPipe(RegisterStudentSchema.body))
    body: RegisterStudentDto,

    @UploadedFile(new JoiValidationPipe(RegisterStudentSchema.file))
    file: Express.Multer.File,
  ) {
    return await this.authService.registerStudent(body, file);
  }

  @Post('/register/tutor')
  async registerTutor(@Body() body: RegisterTutorDto) {
    return await this.authService.registerTutor(body);
  }

  @Post('/login/tutor')
  @UseInterceptors(SignPayloadInterceptor)
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async tutorLogin(@Body() body: { email: string; password: string }) {
    return await this.authService.tutorLogin(body.email, body.password);
  }

  @Post('/login/student')
  @UseInterceptors(SignPayloadInterceptor)
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async studentLogin(@Body() body: { email: string; password: string }) {
    return await this.authService.studentLogin(body.email, body.password);
  }

  @Post('/login/admin')
  @UseInterceptors(SignPayloadInterceptor)
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async adminLogIn(@Body() body: any) {
    return await this.authService.adminLogin(body.email, body.password);
  }
}
