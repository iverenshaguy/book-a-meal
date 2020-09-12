import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import { signup as signupDetails } from '../../utils/mockData';

const {
  rightUserDetails, rightCatererDetails, wrongUserDetails, wrongCatererDetails,
  wrongRoleUserDetails, wrongLengthCatererDetails,
  invalidCatererDetails, longName
} = signupDetails;

// let userToken;

describe('Signup Routes', () => {
  describe('User Signup', () => {
    it('should register a new user and returns user data + token for valid data', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(rightUserDetails)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('token');
          expect(res.body.user).to.include.keys('id');
          expect(res.body.user.email).to.equal('favour@shaguy.com');

          if (err) return done(err);
          done();
        });
    });

    it('should return validation errors for wrong input', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(wrongUserDetails)
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.businessName.msg).to.equal('Unaccepted Field');
          expect(res.body.errors.firstname.msg).to.equal('Firstname must be specified');
          expect(res.body.errors.lastname.msg).to.equal('Lastname must be specified');
          expect(res.body.errors.email.msg).to.equal('Email is invalid');
          expect(res.body.errors.password.msg).to.equal('Password must be at least 8 characters');
          expect(res.body.errors.passwordConfirm.msg).to.equal('Passwords don\'t match');

          if (err) return done(err);
          done();
        });
    });

    it('should return validation errors for invalid username data', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({ role: 'customer', firstname: '6848jkkl()', lastname: '6848jkkl()' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.firstname.msg).to.equal('Firstname can only contain letters and the characters (\'-)');
          expect(res.body.errors.lastname.msg).to.equal('Lastname can only contain letters and the characters (\'-)');

          if (err) return done(err);
          done();
        });
    });

    it('should return validation errors for extra length firstname data', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({ role: 'customer', firstname: longName, lastname: longName })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.firstname.msg).to.equal('Firstname must not be more than 40 characters');
          expect(res.body.errors.lastname.msg).to.equal('Lastname must not be more than 40 characters');

          if (err) return done(err);
          done();
        });
    });

    it('should return validation errors for wrong role', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(wrongRoleUserDetails)
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.role.msg).to.equal('Role must be specified as either caterer or customer');

          if (err) return done(err);
          done();
        });
    });

    it('should return validation errors for no role', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({ role: '' })
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.role.msg).to.equal('Role field cannot be left blank');

          if (err) return done(err);
          done();
        });
    });

    it('should return error for already taken email address', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(Object.assign({}, rightUserDetails, { email: 'iveren@shaguy.com' }))
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Email already in use');

          if (err) return done(err);
          done();
        });
    });
  });

  describe('Caterer Signup', () => {
    it('should register a new user and returns user data + token for valid data', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(rightCatererDetails)
        .end((err, res) => {
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('token');
          expect(res.body.user).to.include.keys('businessName');
          expect(res.body.user).to.include.keys('address');
          expect(res.body.user).to.include.keys('phoneNo');
          expect(res.body.user).to.include.keys('id');
          expect(res.body.user.email).to.equal('wecook@cook.com');
          expect(res.body.user.businessName).to.equal('We Cook');

          if (err) return done(err);
          done();
        });
    });

    it('should return validation errors for wrong input', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(wrongCatererDetails)
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.firstname.msg).to.equal('Unaccepted Field');
          expect(res.body.errors.businessName.msg).to.equal('Business name must be specified');
          expect(res.body.errors.email.msg).to.equal('Email is invalid');
          expect(res.body.errors.password.msg).to.equal('Password must be at least 8 characters');
          expect(res.body.errors.passwordConfirm.msg).to.equal('Passwords don\'t match');
          expect(res.body.errors.address.msg).to.equal('Business Address must be specified');
          expect(res.body.errors.phoneNo.msg).to.equal('Business Phone Number must be in the format 080xxxxxxxx');

          if (err) return done(err);
          done();
        });
    });

    it('should return validation errors for wrong input: long length', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(wrongLengthCatererDetails)
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.businessName.msg).to.equal('Business name must not be more than 60 characters');
          expect(res.body.errors.address.msg).to.equal('Business Address must be between 5 and 255 characters');
          expect(res.body.errors.phoneNo.msg)
            .to.equal('Business Phone Number must be specified');

          if (err) return done(err);
          done();
        });
    });

    it('should return validation errors for wrong input: invalid format', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(invalidCatererDetails)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.businessName.msg)
            .to.equal('Business name can only contain letters, spaces, and the characters (,.\'-)');
          expect(res.body.errors.address.msg)
            .to.equal('Business Address can only contain letters, numbers, spaces, and the characters (,.\'-)');
          expect(res.body.errors.phoneNo.msg)
            .to.equal('Business Phone Number must be in the format 080xxxxxxxx');

          if (err) return done(err);
          done();
        });
    });

    it('should return error for already taken email address', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({ ...rightCatererDetails, email: 'food@circle.com', businessName: 'A Business' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Email already in use');

          if (err) return done(err);
          done();
        });
    });

    it('should return error for already taken business name', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({ ...rightCatererDetails, email: 'new@circle.com' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(409);
          expect(res.body).to.be.an('object');
          expect(res.body.error).to.equal('Business name already in use');

          if (err) return done(err);
          done();
        });
    });
  });
});
