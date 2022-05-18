import { forwardRef, Module } from '@nestjs/common';
import { AppModule } from '../../../src/app.module';
import { AuthModule } from '../auth/auth.module';
import { TutorController } from './tutor.controller';
import { TutorRepository } from './tutor.repository';
import { TutorService } from './tutor.service';

@Module({
  imports: [AuthModule, forwardRef(() => AppModule)],
  controllers: [TutorController],
  exports: [TutorService, TutorRepository],
  providers: [TutorService, TutorRepository],
})
export class TutorModule {}
