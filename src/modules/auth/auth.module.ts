import { Module } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
