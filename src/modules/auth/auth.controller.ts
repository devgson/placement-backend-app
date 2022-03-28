import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseTransformerInterceptor } from './auth.interceptor';
import { JoiValidationPipe } from './auth.pipe';
import {
  LoginSchema,
  RegisterStudentSchema,
  RegisterTutorSchema,
} from './auth.schema';
import { AuthService } from './auth.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { RegisterTutorDto } from './dto/register-tutor.dto';

@UseInterceptors(ResponseTransformerInterceptor)
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
    const student = await this.authService.registerStudent(body, file);
    return {
      data: student,
      message: 'Registered Student Successfully',
    };
  }

  @Post('/register/tutor')
  @UseInterceptors(FileInterceptor('universityId'))
  async registerTutor(
    @Body(new JoiValidationPipe(RegisterTutorSchema.body))
    body: RegisterTutorDto,

    @UploadedFile(new JoiValidationPipe(RegisterTutorSchema.file))
    file: Express.Multer.File,
  ) {
    const tutor = await this.authService.registerTutor(body, file);
    return {
      data: tutor,
      message: 'Registered Tutor Successfully',
    };
  }

  @Post('/login/tutor')
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async tutorLogin(@Body() body: { email: string; password: string }) {
    const token = await this.authService.tutorLogin(body.email, body.password);
    return {
      message: 'Logged In as Tutor successfully',
      data: token,
    };
  }

  @Post('/login/student')
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async studentLogin(@Body() body: { email: string; password: string }) {
    const token = await this.authService.studentLogin(
      body.email,
      body.password,
    );
    return {
      data: token,
      message: 'Logged In as Student successfully',
    };
  }

  @Post('/login/admin')
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async adminLogIn(@Body() body: any) {
    const token = await this.authService.adminLogin(body.email, body.password);
    return {
      data: token,
      message: 'Logged In as Admin successfully',
    };
  }
}
