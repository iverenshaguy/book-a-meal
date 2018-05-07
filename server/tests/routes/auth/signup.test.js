import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import { signup as signupData } from '../../utils/data';

const {
  rightUserData, rightCatererData, wrongUserData, wrongCatererData
} = signupData;

const wrongRoleUserData = {
  role: 'person',
  firstname: 'Favour{}',
  email: 'favour@shaguy.com',
  password: 'favourshaguy',
  passwordConfirm: 'favourshaguy'
};

const wrongLengthCatererData = {
  role: 'caterer',
  businessName: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Aenean malesuada lorem non elit cursus, non sodales orci volutpat. 
  Suspendisse eleifend sed libero dignissim mollis. Nullam imperdiet`,
  email: 'wecook@cook.com',
  password: 'wecookgoofood',
  passwordConfirm: 'wecookgoofood',
  businessAddress: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
  Aenean malesuada lorem non elit cursus, non sodales orci volutpat. 
  Suspendisse eleifend sed libero dignissim mollis. Nullam imperdiet 
  lorem dui, at ultrices purus lacinia in. Integer consequat eros consequat, 
  ornare felis et, faucibus diam. Suspendisse et consequat diam. 
  Duis id tincidunt diam. Nulla ac quam mattis, congue leo vel, rutrum elit. Sed id dolor
   ut lacus vehicula vulputate. Donec dui ex, fringilla vel facilisis a, iaculis id sem`,
};

const wrongCatererDataFormat = {
  role: 'caterer',
  firstname: 'Favour',
  businessName: 'ijjjk89877jjjk',
  businessPhoneNo: 'ijjjk89877jjjk',
  businessAddress: 'uiiowe,ksdyuil&9jk',
};

const longFirstName = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Aenean malesuada lorem non elit cursus, non sodales orci volutpat. 
Suspendisse eleifend sed libero dignissim mollis. Nullam imperdiet`;

// let userToken;

describe('Signup Routes', () => {
  describe('User Signup', () => {
    it('registers a new user and returns user data + token for valid data', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(rightUserData)
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('token');
          expect(res.body.user).to.include.keys('role');
          expect(res.body.user).to.include.keys('created');
          expect(res.body.user).to.include.keys('updated');
          expect(res.body.user).to.include.keys('userId');
          expect(res.body.user.email).to.equal('favour@shaguy.com');

          if (err) return done(err);
          done();
        });
    });

    it('returns validation errors for wrong input', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(wrongUserData)
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.businessName.msg).to.equal('Unaccepted Field');
          expect(res.body.errors.firstname.msg).to.equal('Firstname must be specified');
          expect(res.body.errors.email.msg).to.equal('Email is invalid');
          expect(res.body.errors.password.msg).to.equal('Password must be at least 8 characters');
          expect(res.body.errors.passwordConfirm.msg).to.equal('Passwords don\'t match');

          if (err) return done(err);
          done();
        });
    });

    it('returns validation errors for invalid firstname data', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({ role: 'user', firstname: '6848jkkl()' })
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.firstname.msg).to.equal('Firstname can only contain letters and the characters (,.\'-)');

          if (err) return done(err);
          done();
        });
    });

    it('returns validation errors for extra length firstname data', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({ role: 'user', firstname: longFirstName })
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.firstname.msg).to.equal('Firstname must not be more than 40 characters');

          if (err) return done(err);
          done();
        });
    });

    it('returns validation errors for wrong role', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(wrongRoleUserData)
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.role.msg).to.equal('Role must be specified as Either Caterer or User');

          if (err) return done(err);
          done();
        });
    });

    it('returns validation errors for no role', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send({ role: '' })
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.role.msg).to.equal('Role cannot be empty');

          if (err) return done(err);
          done();
        });
    });

    it('returns error for already taken email address', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(Object.assign({}, rightUserData, { email: 'iveren@shaguy.com' }))
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.email.msg).to.equal('Email already in use');

          if (err) return done(err);
          done();
        });
    });
  });

  describe('Caterer Signup', () => {
    it('registers a new user and returns user data + token for valid data', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(rightCatererData)
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('token');
          expect(res.body.user).to.include.keys('role');
          expect(res.body.user).to.include.keys('businessName');
          expect(res.body.user).to.include.keys('businessAddress');
          expect(res.body.user).to.include.keys('businessPhoneNo');
          expect(res.body.user).to.include.keys('created');
          expect(res.body.user).to.include.keys('updated');
          expect(res.body.user).to.include.keys('userId');
          expect(res.body.user.role).to.equal('caterer');
          expect(res.body.user.email).to.equal('wecook@cook.com');
          expect(res.body.user.businessName).to.equal('We Cook');

          if (err) return done(err);
          done();
        });
    });

    it('returns validation errors for wrong input', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(wrongCatererData)
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.firstname.msg).to.equal('Unaccepted Field');
          expect(res.body.errors.businessName.msg).to.equal('Business Name must be specified');
          expect(res.body.errors.email.msg).to.equal('Email is invalid');
          expect(res.body.errors.password.msg).to.equal('Password must be at least 8 characters');
          expect(res.body.errors.passwordConfirm.msg).to.equal('Passwords don\'t match');
          expect(res.body.errors.businessAddress.msg).to.equal('Business Address must be specified');
          expect(res.body.errors.businessPhoneNo.msg).to.equal('Business Phone Number must be in the format +2348134567890');

          if (err) return done(err);
          done();
        });
    });

    it('returns validation errors for wrong input: long length', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(wrongLengthCatererData)
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.businessName.msg).to.equal('Business Name must not be more than 60 characters');
          expect(res.body.errors.businessAddress.msg).to.equal('Business Address must be between 5 and 255 characters');
          expect(res.body.errors.businessPhoneNo.msg)
            .to.equal('Business Phone Number must be specified');

          if (err) return done(err);
          done();
        });
    });

    it('returns validation errors for wrong input: invalid format', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(wrongCatererDataFormat)
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.businessName.msg)
            .to.equal('Business Name can only contain letters, spaces, and the characters (,.\'-)');
          expect(res.body.errors.businessAddress.msg)
            .to.equal('Business Address can only contain letters, numbers, spaces, and the characters (,.\'-)');
          expect(res.body.errors.businessPhoneNo.msg)
            .to.equal('Business Phone Number must be in the format +2348134567890');

          if (err) return done(err);
          done();
        });
    });

    it('returns error for already taken email address', (done) => {
      request.agent(app)
        .post('/api/v1/auth/signup')
        .send(Object.assign({}, rightCatererData, { email: 'food@circle.com' }))
        .end((err, res) => {
          // userToken = res.body.token;
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.be.an('object');
          expect(res.body.errors.email.msg).to.equal('Email already in use');

          if (err) return done(err);
          done();
        });
    });
  });
});
