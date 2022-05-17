import { ApplicationStatus, PlacementStatus } from '@prisma/client';
export declare class GetTutorDto {
    id?: string;
    registrationStatus?: ApplicationStatus;
}
export declare class GetStudentDto {
    id?: string;
    status?: ApplicationStatus;
}
export declare class GetPlacementDto {
    id?: string;
    status?: PlacementStatus;
}
export declare class GetRegistrationsDto {
    id?: string;
    type?: 'student' | 'tutor';
    registrationStatus?: ApplicationStatus;
}
export declare class GetAuthorizationRequestsDto {
    id?: string;
    status?: ApplicationStatus;
}
export declare class ApproveRegistrationDto {
    type: 'student' | 'tutor';
}
export declare class RejectRegistrationDto {
    type: 'student' | 'tutor';
}
export declare class ApproveAuthorizationRequestDto {
    tutorId: string;
    comment?: string;
}
export declare class RejectAuthorizationRequestDto {
    comment?: string;
}
