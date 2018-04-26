import request from 'supertest';
import { expect } from 'chai';
import moment from 'moment';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import unAuthorized from '../../utils/unAuthorized';

const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';
const currentDay = moment().format('YYYY-MM-DD');
const twoDaysTime = moment().add(1, 'days').format('YYYY-MM-DD');

describe('Menu Routes: Add a new menu', () => {
  const menu1 = {
    date: currentDay,
    meals: [
      '72a3417e-45c8-4559-8b74-8b5a61be8614',
      '8a65538d-f862-420e-bcdc-80743df06578',
      'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
    ]
  };

  const menu2 = {
    date: twoDaysTime,
    meals: [
      '72a3417e-45c8-4559-8b74-8b5a61be8614',
      '8a65538d-f862-420e-bcdc-80743df06578',
      'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
    ]
  };

  const menu3 = {
    date: '2017-01-02',
    meals: [
      '72a3417e-45c8-4559-8b74-8b5a61be8614',
      '8a65538d-f862-420e-bcdc-80743df06578',
      'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
    ]
  };

  const badMenu = {
    date: '30-04-2018',
    meals: [
      '72a3417e-45c8-4559ie-8b74-8b5a61be8614',
      '8a65538d-f862-420e78-bcdc-80743df06578',
      'f9eb7652-125a-4bcbuu-ad81-02f84901cdc3',
    ]
  };

  it('should add a menu for authenticated user, for the current day', (done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
      .send(menu1)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('menuId');
        expect(res.body).to.include.keys('date');
        expect(res.body.date).to.equal(currentDay);
        expect(res.body.meals[0].mealId).to.equal('72a3417e-45c8-4559-8b74-8b5a61be8614');

        if (err) return done(err);
        done();
      });
  });

  it('should add a menu for authenticated user, for two days time', (done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
      .send(menu2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('menuId');
        expect(res.body).to.include.keys('date');
        expect(res.body.date).to.equal(twoDaysTime);
        expect(res.body.meals[0].mealId).to.equal('72a3417e-45c8-4559-8b74-8b5a61be8614');

        if (err) return done(err);
        done();
      });
  });

  it('should not add menu for earlier date', (done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
      .send(menu3)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.date.msg).to.equal('Date must be either today or in the future');

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid input', (done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
      .send(badMenu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.date.msg).to.equal('Date is invalid, valid format is YYYY-MM-DD');
        expect(res.body.errors.meals.msg).to.equal('Meals must be an array of mealIds');

        if (err) return done(err);
        done();
      });
  });

  notAdmin(
    'should return 403 error for authorized user ie non admin or caterer',
    request(app), 'post', '/api/v1/meals'
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'post', '/api/v1/meals'
  );
});
