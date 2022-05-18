import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { setupApp } from '../src/setup-app';
import { AuthService } from '../src/modules/auth/auth.service';

describe('Student Routes', () => {
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
        email: 'khalil@student.le.ac.uk',
      });
    });
  });

  it('Get Placements', () => {
    return request(app.getHttpServer())
      .get('/students/placements')
      .set('Authorization', '')
      .expect(200);
  });

  it('Get Authorization Requests', () => {
    return request(app.getHttpServer())
      .get('/students/authorization-requests')
      .set('Authorization', '')
      .expect(200);
  });
});
