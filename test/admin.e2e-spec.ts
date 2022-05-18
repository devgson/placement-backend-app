import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { setupApp } from '../src/setup-app';
import { AuthService } from '../src/modules/auth/auth.service';
import { ApproveRegistrationDto } from '../src/modules/admin/admin.dto';

describe('Admin', () => {
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
      return Promise.resolve({ email: 'admin@admin.com' });
    });
  });

  it('Get Tutors', () => {
    return request(app.getHttpServer())
      .get('/admin/tutors')
      .set('Authorization', '')
      .expect(200);
  });

  it('Get Placements', () => {
    return request(app.getHttpServer())
      .get('/admin/placements')
      .set('Authorization', '')
      .expect(200);
  });

  it('Get Registrations', () => {
    return request(app.getHttpServer())
      .get('/admin/registrations')
      .set('Authorization', '')
      .expect(200);
  });

  it('Get Authorization Requests', () => {
    return request(app.getHttpServer())
      .get('/admin/authorization-requests')
      .set('Authorization', '')
      .expect(200);
  });

  it('Approve student registration', () => {
    const body: ApproveRegistrationDto = { type: 'student' };

    return request(app.getHttpServer())
      .post(`/admin/registrations/db450f56-9a8d-4670-8bcf-5d9d24261d5b/approve`)
      .send(body)
      .set('Authorization', '')
      .expect(201);
  });

  it('Reject student registration', () => {
    const body: ApproveRegistrationDto = { type: 'student' };

    return request(app.getHttpServer())
      .post(`/admin/registrations/db450f56-9a8d-4670-8bcf-5d9d24261d5b/reject`)
      .send(body)
      .set('Authorization', '')
      .expect(201);
  });
});
