import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as randomString from 'random-string';

import { AppModule } from '../../src/app/app.module';
import { mockSequelize, validationPipe } from '../utils/setup';
import { login as loginData } from '../utils/mockData';
import { User } from '../../src/users/user.model';
import Mailer from '../../src/common/utils/Mailer';

const { nonExistingUser, newUser } = loginData;

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let user: User;
  let token = randomString({ length: 40 });
  const url = '/api/v2/auth/reset_password';
  const newPassword = 'new-password';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(validationPipe);

    await app.init();
    await mockSequelize.sync({ force: true });

    user = await User.create(newUser);
    user.update({
      passwordResetToken: token,
      passwordTokenExpiry: Date.now() + 3600000
    })
  });

  afterAll(async () => {
    await app.close();
    await mockSequelize.sync({ force: true });
  });

  describe('Reset Password Routes', () => {
    it('should reset a user\'s password', (done) => {
      const sendMailSpy = jest.fn();
      jest.
        spyOn(Mailer, 'sendMail')
        .mockImplementation(sendMailSpy);

      request(app.getHttpServer())
        .post(`${url}?token=${token}&email=${user.email}`)
        .send({ password: newPassword })
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).toEqual('Password reset successful');
          expect(sendMailSpy).toHaveBeenCalledTimes(1);

          if (err) return done(err);
          done();
        });
    });

    it('should login the user with the new password', (done) => {
      request(app.getHttpServer())
        .post('/api/v2/auth/signin')
        .send({ email: user.email, password: newPassword })
        .expect(200)
        .end((err, res) => {
          expect(res.body).toHaveProperty('token');
          expect(res.body.user.firstname).toEqual('Iveren');
          expect(res.body.user.email).toEqual('iveren@shaguy.com');
  
          if (err) return done(err);
          done();
        });
    });
  
    it('should not reset a user\'s password with expired token', async (done) => {
      await user.update({
        passwordResetToken: token,
        passwordTokenExpiry: Date.now() - 3600000
      })

      request(app.getHttpServer())
        .post(`${url}?token=${token}&email=${user.email}`)
        .send({ password: 'newer-password' })
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).toEqual('Bad Request');
          expect(res.body.message).toEqual('Password reset token is invalid or has expired');
          
          if (err) return done(err);
          done();
        });
    });
  
    it('should not reset password for a non existing user', (done) => {
      request(app.getHttpServer())
        .post(`${url}?token=${token}&email=fake@user.com`)
        .send(nonExistingUser)
        .expect(400)
        .end((err, res) => {
          expect(res.body.error).toEqual('Bad Request');
          expect(res.body.message).toEqual('Password reset token is invalid or has expired');
  
          if (err) return done(err);
          done();
        });
    });

  
    it('should return validation errors for wrong input', (done) => {
      request(app.getHttpServer())
        .post(`${url}?token=${token}&email=${user.email}`)
        .send({ password: '' })
        .expect(400)
        .end((err, res) => {
          expect(res.body.errors.password.msg).toEqual('Password must be at least 8 characters');
  
          if (err) return done(err);
          done();
        });
    });
  });
  
});
