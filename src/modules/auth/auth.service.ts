import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterStudentDto } from './dto/register-student.dto';

import * as bcrypt from 'bcrypt';
import { FileService } from 'src/services/file/file.service';
import { RegisterTutorDto } from './dto/register-tutor.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private fileService: FileService,
    private jwtService: JwtService,
  ) {}

  async generateJWT(payload) {
    return this.jwtService.sign(payload, { expiresIn: '1 day' });
  }

  async adminLogin(email: string, password: string) {
    //const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await this.authRepository.getAdmin(email, password);
    if (!admin) throw new UnauthorizedException();
    return admin;
  }

  async studentLogin(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.authRepository.getStudent(email, hashedPassword);
  }

  async tutorLogin(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.authRepository.getTutor(email, hashedPassword);
  }

  async registerStudent(
    student: RegisterStudentDto,
    file: Express.Multer.File,
  ) {
    const uploadedFile = await this.fileService.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    const password = await bcrypt.hash(student.password, 10);
    student.password = password;
    student.universityId = uploadedFile.secure_url;
    return await this.authRepository.registerStudent(student);
  }

  async registerTutor(tutor: RegisterTutorDto) {
    const password = await bcrypt.hash(tutor.password, 10);
    tutor.password = password;
    return await this.authRepository.registerTutor(tutor);
  }
}
