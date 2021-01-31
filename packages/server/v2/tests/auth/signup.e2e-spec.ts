import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app/app.module';
import { mockSequelize, validationPipe } from '../utils/setup';
import { signup as signupData } from '../utils/mockData';

const {
  rightUserDetails, rightCatererDetails, wrongUserDetails, wrongCatererDetails,
  wrongRoleUserDetails, wrongLengthCatererDetails,
  invalidCatererDetails, longName
} = signupData;

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

  describe('Signup Routes', () => {
    describe('User Signup', () => {
      it('should register a new user and returns user data + token for valid data', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send(rightUserDetails)
          .expect(201)
          .end((err, res) => {
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).toHaveProperty('id');
            expect(res.body.user.email).toEqual('favour@shaguy.com');
  
            if (err) return done(err);
            done();
          });
      });
  
      it('should return validation errors for wrong input', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send(wrongUserDetails)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.businessName.msg).toEqual('Unacceptable Field');
            expect(res.body.errors.firstname.msg).toEqual('Firstname cannot be left blank');
            expect(res.body.errors.lastname.msg).toEqual('Lastname must be specified');
            expect(res.body.errors.email.msg).toEqual('Email is invalid');
            expect(res.body.errors.password.msg).toEqual('Password must be at least 8 characters');
            expect(res.body.errors.passwordConfirm.msg).toEqual('Passwords don\'t match');
  
            if (err) return done(err);
            done();
          });
      });
  
      it('should return validation errors for invalid username data', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send({ role: 'customer', firstname: '6848jkkl()', lastname: '6848jkkl()' })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.firstname.msg).toEqual('Firstname can only contain letters and the characters (\'-)');
            expect(res.body.errors.lastname.msg).toEqual('Lastname can only contain letters and the characters (\'-)');
  
            if (err) return done(err);
            done();
          });
      });
  
      it('should return validation errors for extra length firstname data', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send({ role: 'customer', firstname: longName, lastname: longName })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.firstname.msg).toEqual('Firstname must not be more than 40 characters');
            expect(res.body.errors.lastname.msg).toEqual('Lastname must not be more than 40 characters');
  
            if (err) return done(err);
            done();
          });
      });
  
      it('should return validation errors for wrong role', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send(wrongRoleUserDetails)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.role.msg).toEqual('Role must be specified as either caterer or customer');
  
            if (err) return done(err);
            done();
          });
      });
  
      it('should return validation errors for no role', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send({ role: '' })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.role.msg).toEqual('Role must be specified as either caterer or customer');
  
            if (err) return done(err);
            done();
          });
      });
  
      it('should return error for already taken email address', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send(Object.assign({}, rightUserDetails, { email: 'favour@shaguy.com' }))
          .expect(409)
          .end((err, res) => {
            expect(res.body.error).toEqual('Email already in use');
  
            if (err) return done(err);
            done();
          });
      });
    });
  
    describe('Caterer Signup', () => {
      it('should register a new user and returns user data + token for valid data', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send(rightCatererDetails)
          .expect(201)
          .end((err, res) => {
            expect(res.body).toHaveProperty('token');
            expect(res.body.user).toHaveProperty('businessName');
            expect(res.body.user).toHaveProperty('address');
            expect(res.body.user).toHaveProperty('phoneNo');
            expect(res.body.user).toHaveProperty('id');
            expect(res.body.user.email).toEqual('wecook@cook.com');
            expect(res.body.user.businessName).toEqual('We Cook');
  
            if (err) return done(err);
            done();
          });
      });
  
      it('should return validation errors for wrong input', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send(wrongCatererDetails)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.firstname.msg).toEqual('Unacceptable Field');
            expect(res.body.errors.businessName.msg).toEqual('Business name cannot be left blank');
            expect(res.body.errors.email.msg).toEqual('Email is invalid');
            expect(res.body.errors.password.msg).toEqual('Password must be at least 8 characters');
            expect(res.body.errors.passwordConfirm.msg).toEqual('Passwords don\'t match');
            expect(res.body.errors.address.msg).toEqual('Business address must be specified');
            expect(res.body.errors.phoneNo.msg).toEqual('Business phone number must be in the format 080xxxxxxxx');
  
            if (err) return done(err);
            done();
          });
      });
  
      it('should return validation errors for wrong input: long length', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send(wrongLengthCatererDetails)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.businessName.msg).toEqual('Business name must not be more than 60 characters');
            expect(res.body.errors.address.msg).toEqual('Business address must be between 5 and 255 characters');
            expect(res.body.errors.phoneNo.msg)
              .toEqual('Business phone number must be specified');
  
            if (err) return done(err);
            done();
          });
      });

      it('should return validation errors for wrong input: short address length', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send({ ...wrongLengthCatererDetails, address: 'shor' })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.address.msg).toEqual('Business address must be between 5 and 255 characters');

            if (err) return done(err);
            done();
          });
      });
  
      it('should return validation errors for wrong input: invalid format', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send(invalidCatererDetails)
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.businessName.msg)
              .toEqual('Business name can only contain letters, numbers, spaces, and the characters (,.\'-)');
            expect(res.body.errors.address.msg)
              .toEqual('Business address can only contain letters, numbers, spaces, and the characters (,.\'-)');
            expect(res.body.errors.phoneNo.msg)
              .toEqual('Business phone number must be in the format 080xxxxxxxx');
  
            if (err) return done(err);
            done();
          });
      });
  
      it('should return error for already taken email address', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send({ ...rightCatererDetails, email: 'wecook@cook.com', businessName: 'A Business' })
          .expect(409)
          .end((err, res) => {
            expect(res.body.error).toEqual('Email already in use');
  
            if (err) return done(err);
            done();
          });
      });
  
      it('should return error for already taken business name', (done) => {
        request(app.getHttpServer())
          .post('/api/v2/auth/signup')
          .send({ ...rightCatererDetails, email: 'new@circle.com' })
          .expect(409)
          .end((err, res) => {
            expect(res.body.error).toEqual('Business name already in use');
  
            if (err) return done(err);
            done();
          });
      });
    });
  });
});
