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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorController = void 0;
const common_1 = require("@nestjs/common");
const tutor_dto_1 = require("./tutor.dto");
const tutor_guard_1 = require("./tutor.guard");
const tutor_interceptor_1 = require("./tutor.interceptor");
const tutor_pipe_1 = require("./tutor.pipe");
const tutor_schema_1 = require("./tutor.schema");
const tutor_service_1 = require("./tutor.service");
let TutorController = class TutorController {
    constructor(tutorService) {
        this.tutorService = tutorService;
    }
    async getTutorPlacements(req, query) {
        const placements = await this.tutorService.getTutorPlacements(req.user.id, query);
        return {
            data: placements,
            message: 'Tutor placements retrieved successfully',
        };
    }
    async schedulePlacementVisit(req, body, param) {
        const placement = await this.tutorService.updatePlacement(req.user.id, param.placementId, body);
        return {
            data: placement,
            message: 'Scheduled placement visit successfully',
        };
    }
    async setScheduledVisitStatus(req, body, param) {
        const placement = await this.tutorService.updatePlacement(req.user.id, param.placementId, body);
        return {
            data: placement,
            message: 'Updated placement visit successfully',
        };
    }
};
__decorate([
    (0, common_1.Get)('/placements'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)(new tutor_pipe_1.JoiValidationPipe(tutor_schema_1.GetTutorPlacementsSchema))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "getTutorPlacements", null);
__decorate([
    (0, common_1.Put)('/placements/:placementId/visit'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new tutor_pipe_1.JoiValidationPipe(tutor_schema_1.SchedulePlacementVisitSchema.body))),
    __param(2, (0, common_1.Param)(new tutor_pipe_1.JoiValidationPipe(tutor_schema_1.SchedulePlacementVisitSchema.params))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tutor_dto_1.SchedulePlacementVisitDto, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "schedulePlacementVisit", null);
__decorate([
    (0, common_1.Put)('/placements/:placementId/visit/status'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)(new tutor_pipe_1.JoiValidationPipe(tutor_schema_1.SchedulePlacementVisitStatusSchema.body))),
    __param(2, (0, common_1.Param)(new tutor_pipe_1.JoiValidationPipe(tutor_schema_1.SchedulePlacementVisitStatusSchema.params))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, tutor_dto_1.SchedulePlacementVisitStatusDto, Object]),
    __metadata("design:returntype", Promise)
], TutorController.prototype, "setScheduledVisitStatus", null);
TutorController = __decorate([
    (0, common_1.UseGuards)(tutor_guard_1.TutorGuard),
    (0, common_1.UseInterceptors)(tutor_interceptor_1.TutorAuthInterceptor),
    (0, common_1.UseInterceptors)(tutor_interceptor_1.ResponseTransformerInterceptor),
    (0, common_1.Controller)('/tutors'),
    __metadata("design:paramtypes", [tutor_service_1.TutorService])
], TutorController);
exports.TutorController = TutorController;
//# sourceMappingURL=tutor.controller.js.map