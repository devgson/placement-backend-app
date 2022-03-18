import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterStudentDto } from './dto/register-student.dto';

import bcrypt from 'bcrypt';
import { FileService } from 'src/services/file/file.service';
import { RegisterTutorDto } from './dto/register-tutor.dto';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private fileService: FileService,
  ) {}

  async adminLogin(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.authRepository.getAdmin(email, hashedPassword);
  }

  async studentLogin(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.authRepository.getStudent(email, hashedPassword);
  }

  async tutorLogin(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.authRepository.getTutor(email, hashedPassword);
  }

  async registerStudent(student: RegisterStudentDto) {
    const password = await bcrypt.hash(student.password, 10);
    student.password = password;
    return await this.authRepository.registerStudent(student);
  }

  async registerTutor(tutor: RegisterTutorDto) {
    const password = await bcrypt.hash(tutor.password, 10);
    tutor.password = password;
    return await this.authRepository.registerTutor(tutor);
  }
}
