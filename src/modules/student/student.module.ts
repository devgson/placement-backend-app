import { forwardRef, Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentRepository } from './student.repository';
import { AuthModule } from '../auth/auth.module';
import { AppModule } from 'src/app.module';

@Module({
  imports: [AuthModule, forwardRef(() => AppModule)],
  controllers: [StudentController],
  exports: [StudentService, StudentRepository],
  providers: [StudentService, StudentRepository],
})
export class StudentModule {}
