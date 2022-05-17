"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorModule = void 0;
const common_1 = require("@nestjs/common");
const app_module_1 = require("../../app.module");
const auth_module_1 = require("../auth/auth.module");
const tutor_controller_1 = require("./tutor.controller");
const tutor_repository_1 = require("./tutor.repository");
const tutor_service_1 = require("./tutor.service");
let TutorModule = class TutorModule {
};
TutorModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, (0, common_1.forwardRef)(() => app_module_1.AppModule)],
        controllers: [tutor_controller_1.TutorController],
        exports: [tutor_service_1.TutorService, tutor_repository_1.TutorRepository],
        providers: [tutor_service_1.TutorService, tutor_repository_1.TutorRepository],
    })
], TutorModule);
exports.TutorModule = TutorModule;
//# sourceMappingURL=tutor.module.js.map