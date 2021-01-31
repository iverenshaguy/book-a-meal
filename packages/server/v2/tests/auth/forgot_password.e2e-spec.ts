import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../../src/app/app.module';
import { mockSequelize, validationPipe } from '../utils/setup';
import { login as loginData } from '../utils/mockData';
import { User } from '../../src/users/user.model';
import Mailer from '../../src/common/utils/Mailer';

const { newUser, nonExistingUser } = loginData;

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let user: User;
  const url = '/api/v2/auth'

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

  describe('Forgot Password Routes', () => {
    it('should trigger forgot password for a registered user', (done) => {
      const sendMailSpy = jest.fn();
      jest.
        spyOn(Mailer, 'sendMail')
        .mockImplementation(sendMailSpy);

      request(app.getHttpServer())
        .post(`${url}/forgot_password`)
        .send({ email: user.email })
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).toEqual('A reset token has been sent to your email address');
          expect(sendMailSpy).toHaveBeenCalledTimes(1);
  
          if (err) return done(err);
          done();
        });
    });
  
    it('should trigger forgot password for an unregistered user', (done) => {
      const sendMailSpy = jest.fn();
      jest.
        spyOn(Mailer, 'sendMail')
        .mockImplementation(sendMailSpy);

      request(app.getHttpServer())
        .post(`${url}/forgot_password`)
        .send({ email: nonExistingUser.email })
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).toEqual('A reset token has been sent to your email address');
          expect(sendMailSpy).not.toHaveBeenCalled();
  
          if (err) return done(err);
          done();
        });
    });
  
    it('should return validation errors for wrong input', (done) => {
      request(app.getHttpServer())
        .post(`${url}/forgot_password`)
        .send({ email: '' })
        .expect(400)
        .end((err, res) => {
          expect(res.body.errors.email.msg).toEqual('Email is invalid');
  
          if (err) return done(err);
          done();
        });
    });
  });
  
});
