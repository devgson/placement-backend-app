"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorGuard = void 0;
const common_1 = require("@nestjs/common");
const auth_repository_1 = require("../auth/auth.repository");
const auth_service_1 = require("../auth/auth.service");
let TutorGuard = class TutorGuard {
    constructor(authService, authRepository) {
        this.authService = authService;
        this.authRepository = authRepository;
    }
    async canActivate(context) {
        var _a;
        const request = context.switchToHttp().getRequest();
        const token = (_a = request.headers) === null || _a === void 0 ? void 0 : _a.authorization.replace('Bearer ', '');
        const tutor = await this.authService.validateJWT(token).catch(() => {
            throw new common_1.UnauthorizedException('Invalid Token, please obtain a new one');
        });
        const tutorExists = this.authRepository.getTutor({ email: tutor.email });
        if (!tutorExists) {
            throw new common_1.UnauthorizedException('Invalid Token, please obtain a new one');
        }
        return true;
    }
};
TutorGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        auth_repository_1.AuthRepository])
], TutorGuard);
exports.TutorGuard = TutorGuard;
//# sourceMappingURL=tutor.guard.js.map