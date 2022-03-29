import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { FileService } from './services/file.service';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { StudentModule } from './modules/student/student.module';
import { TutorModule } from './modules/tutor/tutor.module';
import { CloudinaryProvider } from './services/file.provider';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    AuthModule,
    AdminModule,
    StudentModule,
    TutorModule,
  ],
  controllers: [AppController],
  providers: [CloudinaryProvider, AppService, PrismaService, FileService],
  exports: [FileService, PrismaService],
})
export class AppModule {}
