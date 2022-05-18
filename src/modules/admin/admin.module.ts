import { forwardRef, Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { AppModule } from '../../app.module';
import { AuthModule } from '../auth/auth.module';
import { TutorModule } from '../tutor/tutor.module';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    AuthModule,
    TutorModule,
    StudentModule,
    forwardRef(() => AppModule),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
})
export class AdminModule {}
