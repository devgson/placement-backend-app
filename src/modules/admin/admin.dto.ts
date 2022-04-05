import { ApplicationStatus, PlacementStatus } from '@prisma/client';

export class GetTutorDto {
  id?: string;
  status?: ApplicationStatus;
}

export class GetStudentDto {
  id?: string;
  status?: ApplicationStatus;
}

export class GetPlacementDto {
  id?: string;
  status?: PlacementStatus;
}

export class GetRegistrationsDto {
  id?: string;
  type: 'student' | 'tutor';
  status: ApplicationStatus = ApplicationStatus.pending;
}

export class GetAuthorizationRequestsDto {
  id?: string;
  status?: ApplicationStatus;
}

export class ApproveRegistrationDto {
  type: 'student' | 'tutor';
}

export class RejectRegistrationDto {
  type: 'student' | 'tutor';
}

export class ApproveAuthorizationRequestDto {
  tutorId: string;
  comment?: string;
}

export class RejectAuthorizationRequestDto {
  comment?: string;
}
