import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app/app.module';
import { mockSequelize, validationPipe, generateUserToken, fakeUserToken, expiredToken, wrongSecretToken, invalidToken  } from '../utils/setup';
import { login as loginData } from '../utils/mockData';
import { User } from '../../src/users/user.model';

const { newUser } = loginData;

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let user;
  const url = '/api/v2/auth/refresh_token';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(validationPipe);

    await app.init();
    await mockSequelize.sync({ force: true });

    user = await User.create(newUser);
  });

  afterAll(async () => {
    await app.close();
    await mockSequelize.sync({ force: true });
  });

  describe('Reset Token Routes', () => {
    it('should refresh a user\'s token', (done) => {
      const token = generateUserToken(user.id, user.email, user.role);

      request(app.getHttpServer())
        .get(url)
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          expect(res.body).toHaveProperty('token');
  
          if (err) return done(err);
          done();
        });
    });
  
    it('should not refresh token for a non-existing user', (done) => {
      request(app.getHttpServer())
        .get(url)
        .set('Authorization', fakeUserToken)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).toEqual('Unauthorized');
  
          if (err) return done(err);
          done();
        });
    });

    it('should not refresh token for a user with expired credentials', (done) => {
      request(app.getHttpServer())
        .get(url)
        .set('Authorization', expiredToken)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).toEqual('Unauthorized');
  
          if (err) return done(err);
          done();
        });
    });

    it('should not refresh token for a user with bad credentials i.e bad token secret', (done) => {
      request(app.getHttpServer())
        .get(url)
        .set('Authorization', wrongSecretToken)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).toEqual('Unauthorized');
  
          if (err) return done(err);
          done();
        });
    });


    it('should not refresh token for a user with an invalid token', (done) => {
      request(app.getHttpServer())
        .get(url)
        .set('Authorization', invalidToken)
        .expect(401)
        .end((err, res) => {
          expect(res.body.message).toEqual('Unauthorized');
  
          if (err) return done(err);
          done();
        });
    });
  });
  
});
