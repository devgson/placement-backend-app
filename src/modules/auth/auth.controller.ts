import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReponseTransformerInterceptor } from './auth.interceptor';
import { JoiValidationPipe } from './auth.pipe';
import {
  LoginSchema,
  RegisterStudentSchema,
  RegisterTutorSchema,
} from './auth.schema';
import { AuthService } from './auth.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { RegisterTutorDto } from './dto/register-tutor.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register/student')
  @UseInterceptors(FileInterceptor('universityId'))
  @UseInterceptors(ReponseTransformerInterceptor)
  async registerStudent(
    @Body(new JoiValidationPipe(RegisterStudentSchema.body))
    body: RegisterStudentDto,

    @UploadedFile(new JoiValidationPipe(RegisterStudentSchema.file))
    file: Express.Multer.File,
  ) {
    const student = await this.authService.registerStudent(body, file);
    return {
      message: 'Registered Student Successfully',
      result: student,
    };
  }

  @Post('/register/tutor')
  @UseInterceptors(FileInterceptor('universityId'))
  @UseInterceptors(ReponseTransformerInterceptor)
  async registerTutor(
    @Body(new JoiValidationPipe(RegisterTutorSchema.body))
    body: RegisterTutorDto,

    @UploadedFile(new JoiValidationPipe(RegisterTutorSchema.file))
    file: Express.Multer.File,
  ) {
    const tutor = await this.authService.registerTutor(body, file);
    return {
      message: 'Registered Tutor Successfully',
      result: tutor,
    };
  }

  @Post('/login/tutor')
  @UseInterceptors(ReponseTransformerInterceptor)
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async tutorLogin(@Body() body: { email: string; password: string }) {
    const token = await this.authService.tutorLogin(body.email, body.password);
    return {
      message: 'Logged In as Tutor successfully',
      result: token,
    };
  }

  @Post('/login/student')
  @UseInterceptors(ReponseTransformerInterceptor)
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async studentLogin(@Body() body: { email: string; password: string }) {
    const token = await this.authService.studentLogin(
      body.email,
      body.password,
    );
    return {
      message: 'Logged In as Student successfully',
      result: token,
    };
  }

  @Post('/login/admin')
  @UseInterceptors(ReponseTransformerInterceptor)
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async adminLogIn(@Body() body: any) {
    const token = await this.authService.adminLogin(body.email, body.password);
    return {
      message: 'Logged In as Admin successfully',
      result: token,
    };
  }
}
