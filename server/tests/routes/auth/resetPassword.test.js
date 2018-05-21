import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import db from '../../../src/models';

describe('Password Routes', () => {
  describe('Forgot Password', () => {
    it('sends reset password mail', (done) => {
      request.agent(app)
        .post('/api/v1/auth/forgot_password')
        .send({ email: 'emiola@olasanmi.com' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.message).to.equal('A reset token has been sent to your email address');

          if (err) return done(err);
          done();
        });
    });

    it('doesn\'t send reset password mail to none existing user', (done) => {
      request.agent(app)
        .post('/api/v1/auth/forgot_password')
        .send({ email: 'non@existing.com' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.error).to.equal('User doesn\'t exist on the platform');

          if (err) return done(err);
          done();
        });
    });

    it('returns validation errors for invalid email', (done) => {
      request.agent(app)
        .post('/api/v1/auth/forgot_password')
        .send({ email: 'emi@ola' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.email.msg).to.equal('Email is invalid');

          if (err) return done(err);
          done();
        });
    });
  });
  describe('Reset Password', () => {
    it('resets password and sends reset password successful mail', (done) => {
      db.User.findOne({ where: { email: 'emiola@olasanmi.com' } }).then((user) => {
        request.agent(app)
          .post(`/api/v1/auth/reset_password?token=${user.passwordResetToken}`)
          .send({ password: 'emiolaolasanmi2' })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.message).to.equal('Password reset successful');

            if (err) return done(err);
            done();
          });
      });
    });

    it('doesn\'t reset password for invalid/expired token', (done) => {
      db.User.findOne({ where: { email: 'emiola@olasanmi.com' } }).then((user) => {
        request.agent(app)
          .post(`/api/v1/auth/reset_password?token=${user.passwordResetToken}`)
          .send({ password: 'emiolaolasanmi2' })
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equal('Password reset token is invalid or has expired');

            if (err) return done(err);
            done();
          });
      });
    });

    it('returns validation errors when no password is provided', (done) => {
      request.agent(app)
        .post('/api/v1/auth/reset_password')
        .send({ password: '' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.password.msg).to.equal('Password field cannot be left blank');

          if (err) return done(err);
          done();
        });
    });

    it('returns validation errors for invalid password', (done) => {
      request.agent(app)
        .post('/api/v1/auth/reset_password')
        .send({ password: 'emi' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.password.msg).to.equal('Password must be at least 8 characters');

          if (err) return done(err);
          done();
        });
    });
  });
});
