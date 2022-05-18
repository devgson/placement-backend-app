import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { setupApp } from '../src/setup-app';
import { AuthService } from '../src/modules/auth/auth.service';
import {
  SchedulePlacementVisitDto,
  SchedulePlacementVisitStatusDto,
} from '../src/modules/tutor/tutor.dto';
import { ScheduledVisitStatus, ScheduledVisitType } from '@prisma/client';

describe('Tutor', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    authService = moduleFixture.get<AuthService>(AuthService);
    await app.init();

    jest.spyOn(authService, 'validateJWT').mockImplementation(() => {
      return Promise.resolve({
        email: 'r.heckel@staff.le.ac.uk',
      });
    });
  });

  it('get placements assigned to', () => {
    return request(app.getHttpServer())
      .get('/tutors/placements')
      .set('Authorization', '')
      .expect(200);
  });

  it('schedule placement visit', () => {
    const body: SchedulePlacementVisitDto = {
      scheduledVisitDate: new Date('10/10/2022').toISOString(),
      scheduledVisitType: ScheduledVisitType.virtual,
    };

    return request(app.getHttpServer())
      .put(`/tutors/placements/40a04c09-75d0-4546-8540-4a62fa89b579/visit`)
      .send(body)
      .set('Authorization', '')
      .expect(200);
  });

  it('update scheduled placement visit status', () => {
    const body: SchedulePlacementVisitStatusDto = {
      scheduledVisitStatus: ScheduledVisitStatus.done,
    };

    return request(app.getHttpServer())
      .put(
        `/tutors/placements/40a04c09-75d0-4546-8540-4a62fa89b579/visit/status`,
      )
      .send(body)
      .set('Authorization', '')
      .expect(200);
  });
});
