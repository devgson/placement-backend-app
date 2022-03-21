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
    const admin = await this.authRepository.getAdmin({ email });
    if (!admin) throw new UnauthorizedException('Invalid Email');
    const invalidPassword = password !== admin.password;
    if (!invalidPassword) throw new UnauthorizedException('Invalid Password');
    delete admin.password;
    return await this.generateJWT(admin);
  }

  async studentLogin(email: string, password: string) {
    const student = await this.authRepository.getStudent({ email });
    if (!student) throw new UnauthorizedException('Invalid Email');
    const invalidPassword = await bcrypt.compare(password, student.password);
    if (!invalidPassword) throw new UnauthorizedException('Invalid Password');
    delete student.password;
    return await this.generateJWT(student);
  }

  async tutorLogin(email: string, password: string) {
    const tutor = await this.authRepository.getTutor({ email });
    if (!tutor) throw new UnauthorizedException('Invalid Email');
    const invalidPassword = await bcrypt.compare(password, tutor.password);
    if (!invalidPassword) throw new UnauthorizedException('Invalid Password');
    delete tutor.password;
    return await this.generateJWT(tutor);
  }

  async registerStudent(
    student: RegisterStudentDto,
    file: Express.Multer.File,
  ) {
    const { email } = student;
    const studentExists = await this.authRepository.getStudent({ email });
    if (studentExists) throw new BadRequestException('Email Already Exists');
    const uploadedFile = await this.fileService.uploadImage(file);
    const password = await bcrypt.hash(student.password, 10);
    student.password = password;
    student.universityId = uploadedFile.secure_url;
    return await this.authRepository.registerStudent(student);
  }

  async registerTutor(tutor: RegisterTutorDto, file: Express.Multer.File) {
    const { email } = tutor;
    const tutorExists = await this.authRepository.getTutor({ email });
    if (tutorExists) throw new BadRequestException('Email Already Exists');
    const uploadedFile = await this.fileService.uploadImage(file);
    const password = await bcrypt.hash(tutor.password, 10);
    tutor.password = password;
    tutor.universityId = uploadedFile.secure_url;
    return await this.authRepository.registerTutor(tutor);
  }
}
