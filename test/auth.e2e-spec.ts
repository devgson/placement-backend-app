import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { setupApp } from '../src/setup-app';

describe('Authentication Routes', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  it('Admin Login', () => {
    return request(app.getHttpServer())
      .post('/auth/login/admin')
      .send({
        email: 'admin@admin.com',
        password: 'admin',
      })
      .expect(201);
  });

  it('Tutor Login', () => {
    return request(app.getHttpServer())
      .post('/auth/login/tutor')
      .send({
        email: 'r.heckel@staff.le.ac.uk',
        password: 'reiko',
      })
      .expect(201);
  });

  it('Student Login', () => {
    return request(app.getHttpServer())
      .post('/auth/login/student')
      .send({
        email: 'khalil@student.le.ac.uk',
        password: 'khalil',
      })
      .expect(201);
  });
});
