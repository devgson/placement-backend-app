import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthRepository } from '../auth/auth.repository';
import { AuthService } from '../auth/auth.service';
export declare class TutorGuard implements CanActivate {
    private authService;
    private authRepository;
    constructor(authService: AuthService, authRepository: AuthRepository);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
