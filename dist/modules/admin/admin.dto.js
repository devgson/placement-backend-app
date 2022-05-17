"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RejectAuthorizationRequestDto = exports.ApproveAuthorizationRequestDto = exports.RejectRegistrationDto = exports.ApproveRegistrationDto = exports.GetAuthorizationRequestsDto = exports.GetRegistrationsDto = exports.GetPlacementDto = exports.GetStudentDto = exports.GetTutorDto = void 0;
const client_1 = require("@prisma/client");
class GetTutorDto {
}
exports.GetTutorDto = GetTutorDto;
class GetStudentDto {
}
exports.GetStudentDto = GetStudentDto;
class GetPlacementDto {
}
exports.GetPlacementDto = GetPlacementDto;
class GetRegistrationsDto {
    constructor() {
        this.registrationStatus = client_1.ApplicationStatus.pending;
    }
}
exports.GetRegistrationsDto = GetRegistrationsDto;
class GetAuthorizationRequestsDto {
}
exports.GetAuthorizationRequestsDto = GetAuthorizationRequestsDto;
class ApproveRegistrationDto {
}
exports.ApproveRegistrationDto = ApproveRegistrationDto;
class RejectRegistrationDto {
}
exports.RejectRegistrationDto = RejectRegistrationDto;
class ApproveAuthorizationRequestDto {
}
exports.ApproveAuthorizationRequestDto = ApproveAuthorizationRequestDto;
class RejectAuthorizationRequestDto {
}
exports.RejectAuthorizationRequestDto = RejectAuthorizationRequestDto;
//# sourceMappingURL=admin.dto.js.map