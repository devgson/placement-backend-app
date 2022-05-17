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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_repository_1 = require("./auth.repository");
const bcrypt = require("bcrypt");
const file_service_1 = require("../../services/file.service");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
let AuthService = class AuthService {
    constructor(authRepository, fileService, jwtService) {
        this.authRepository = authRepository;
        this.fileService = fileService;
        this.jwtService = jwtService;
    }
    async generateJWT(payload) {
        return this.jwtService.sign(payload, { expiresIn: '1 day' });
    }
    async validateJWT(token) {
        return this.jwtService.verify(token);
    }
    async adminLogin(email, password) {
        const admin = await this.authRepository.getAdmin({ email });
        if (!admin)
            throw new common_1.UnauthorizedException('Invalid Email');
        const invalidPassword = password !== admin.password;
        if (invalidPassword)
            throw new common_1.UnauthorizedException('Invalid Password');
        delete admin.password;
        return await this.generateJWT(Object.assign(Object.assign({}, admin), { role: 'admin' }));
    }
    async studentLogin(email, password) {
        const student = await this.authRepository.getStudent({ email });
        if (!student)
            throw new common_1.UnauthorizedException('Invalid Email');
        if (student.registrationStatus !== client_1.ApplicationStatus.approved)
            throw new common_1.UnauthorizedException('Your registration is still under review');
        const invalidPassword = await bcrypt.compare(password, student.password);
        if (!invalidPassword)
            throw new common_1.UnauthorizedException('Invalid Password');
        delete student.password;
        return await this.generateJWT(Object.assign(Object.assign({}, student), { role: 'student' }));
    }
    async tutorLogin(email, password) {
        const tutor = await this.authRepository.getTutor({ email });
        if (!tutor)
            throw new common_1.UnauthorizedException('Invalid Email');
        if (tutor.registrationStatus !== client_1.ApplicationStatus.approved)
            throw new common_1.UnauthorizedException('Your registration is still under review');
        const invalidPassword = await bcrypt.compare(password, tutor.password);
        if (!invalidPassword)
            throw new common_1.UnauthorizedException('Invalid Password');
        delete tutor.password;
        return await this.generateJWT(Object.assign(Object.assign({}, tutor), { role: 'tutor' }));
    }
    async registerStudent(student, file) {
        const { email } = student;
        const studentExists = await this.authRepository.getStudent({ email });
        if (studentExists)
            throw new common_1.BadRequestException('Email Already Exists');
        const uploadedFile = await this.fileService.uploadFile(file);
        const password = await bcrypt.hash(student.password, 10);
        student.password = password;
        student.universityId = uploadedFile.secure_url;
        return await this.authRepository.registerStudent(student);
    }
    async registerTutor(tutor, file) {
        const { email } = tutor;
        const tutorExists = await this.authRepository.getTutor({ email });
        if (tutorExists)
            throw new common_1.BadRequestException('Email Already Exists');
        const uploadedFile = await this.fileService.uploadFile(file);
        const password = await bcrypt.hash(tutor.password, 10);
        tutor.password = password;
        tutor.universityId = uploadedFile.secure_url;
        return await this.authRepository.registerTutor(tutor);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        file_service_1.FileService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map