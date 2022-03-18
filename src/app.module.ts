import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { FileService } from './services/file/file.service';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { StudentModule } from './modules/student/student.module';
import { TutorModule } from './modules/tutor/tutor.module';

@Module({
  imports: [AuthModule, AdminModule, StudentModule, TutorModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, FileService],
})
export class AppModule {}
