import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';

const rightData = {
  firstname: 'Favour',
  lastname: 'Shaguy',
  email: 'favour@shaguy.com',
  password: 'favourshaguy',
  passwordConfirm: 'favourshaguy'
};

const wrongData = {
  firstname: '',
  email: 'favour@shaguy',
  password: 'favou',
  passwordConfirm: 'favourshaguy'
};

// let userToken;

describe('Signup Routes', () => {
  it('registers a new user and returns user data + token for valid data', (done) => {
    request.agent(app)
      .post('/api/v1/auth/signup')
      .send(rightData)
      .end((err, res) => {
        // userToken = res.body.token;
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.keys('token');
        expect(res.body.user).to.include.keys('userId');
        expect(res.body.user.email).to.equal('favour@shaguy.com');

        if (err) return done(err);
        done();
      });
  });

  it('returns validation errors for wrong input', (done) => {
    request.agent(app)
      .post('/api/v1/auth/signup')
      .send(wrongData)
      .end((err, res) => {
        // userToken = res.body.token;
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.firstname.msg).to.equal('Firstname cannot be empty');
        expect(res.body.errors.lastname.msg).to.equal('Lastname must be specified');
        expect(res.body.errors.email.msg).to.equal('Email is invalid');
        expect(res.body.errors.password.msg).to.equal('Password must be at least 8 characters');
        expect(res.body.errors.passwordConfirm.msg).to.equal('Passwords don\'t match');

        if (err) return done(err);
        done();
      });
  });

  it('returns error for already taken email address', (done) => {
    request.agent(app)
      .post('/api/v1/auth/signup')
      .send(Object.assign(rightData, { email: 'iveren@shaguy.com' }))
      .end((err, res) => {
        // userToken = res.body.token;
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.email.msg).to.equal('Email already in use');

        if (err) return done(err);
        done();
      });
  });

  it('returns validation errors for wrong input', (done) => {
    request.agent(app)
      .post('/api/v1/auth/signup')
      .send(wrongData)
      .end((err, res) => {
        // userToken = res.body.token;
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.firstname.msg).to.equal('Firstname cannot be empty');
        expect(res.body.errors.lastname.msg).to.equal('Lastname must be specified');
        expect(res.body.errors.email.msg).to.equal('Email is invalid');
        expect(res.body.errors.password.msg).to.equal('Password must be at least 8 characters');
        expect(res.body.errors.passwordConfirm.msg).to.equal('Passwords don\'t match');

        if (err) return done(err);
        done();
      });
  });
});
