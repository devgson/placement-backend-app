import { forwardRef, Module } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppModule } from 'src/app.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({ secret: 'secret' }),
    forwardRef(() => AppModule),
  ],
  providers: [AuthService, AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
