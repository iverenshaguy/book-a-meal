import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app/app.module';
import { validationPipe } from '../utils/setup';
import { login as loginData } from '../utils/mockData';
import { signup as signupData } from '../utils/mockData';

const { existingUser, nonExistingUser, invalidUser } = loginData;
const { rightUserDetails, rightCatererDetails } = signupData;

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const url = '/api/v2/auth'

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(validationPipe);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Signin Routes', () => {
    it('should sign in a user into the app and returns user + token', (done) => {
      request(app.getHttpServer())
        .post('/api/v2/auth/signin')
        .send(existingUser)
        .expect(200)
        .end((err, res) => {
          expect(res.body).toHaveProperty('token');
          expect(res.body.user.firstname).toEqual('Iveren');
          expect(res.body.user.email).toEqual('iveren@shaguy.com');
  
          if (err) return done(err);
          done();
        });
    });
  
    it('should sign in a caterer into the app and returns user + token', (done) => {
      request(app.getHttpServer())
        .post('/api/v2/auth/signin')
        .send({ email: 'belly@fill.com', password: 'bellyfill' })
        .expect(200)
        .end((err, res) => {
          expect(res.body).toHaveProperty('token');
          expect(res.body.user.businessName).toEqual('BellyFill');
          expect(res.body.user.email).toEqual('belly@fill.com');
  
          if (err) return done(err);
          done();
        });
    });
  
    it('should not sign in a user that does not exist', (done) => {
      request(app.getHttpServer())
        .post('/api/v2/auth/signin')
        .send(nonExistingUser)
        .expect(401)
        .end((err, res) => {
          expect(res.body.error).toEqual('Invalid credentials');
  
          if (err) return done(err);
          done();
        });
    });
  
    it('should not sign in an user existing user with a wrong password', (done) => {
      request(app.getHttpServer())
        .post('/api/v2/auth/signin')
        .send({ ...existingUser, password: 'kowo' })
        .expect(401)
        .end((err, res) => {
          expect(res.body.error).toEqual('Invalid credentials');
  
          if (err) return done(err);
          done();
        });
    });
  
    it('should return validation errors for wrong input', (done) => {
      request(app.getHttpServer())
        .post('/api/v2/auth/signin')
        .send(invalidUser)
        .expect(400)
        .end((err, res) => {
          expect(res.body.errors.email.msg).toEqual('Email is invalid');
          expect(res.body.errors.password.msg).toEqual('Password must be specified');
  
          if (err) return done(err);
          done();
        });
    });
  });
  
});
