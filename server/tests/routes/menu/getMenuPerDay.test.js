import request from 'supertest';
import { expect } from 'chai';
import moment from 'moment';
import app from '../../../src/app';

const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';
const currentDay = moment().format('YYYY-MM-DD');
const menu = {
  date: currentDay,
  meals: [
    '72a3417e-45c8-4559-8b74-8b5a61be8614',
    '8a65538d-f862-420e-bcdc-80743df06578',
    'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
  ]
};

describe('Menu Routes: Get the menu specific day', () => {
  it('should add a menu for authenticated user, for the current day', (done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
      .send(menu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);

        if (err) return done(err);
        done();
      });
  });

  it('should get menu for the current day', (done) => {
    request(app)
      .get('/api/v1/menu')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('menuId');
        expect(res.body).to.include.keys('date');
        expect(res.body.date).to.equal(currentDay);
        expect(res.body.meals[0].mealId).to.equal('72a3417e-45c8-4559-8b74-8b5a61be8614');

        if (err) return done(err);
        done();
      });
  });

  it('should get menu for a specific day', (done) => {
    request(app)
      .get('/api/v1/menu?date=2018-05-06')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('menuId');
        expect(res.body).to.include.keys('date');
        expect(res.body.date).to.equal('2018-05-06');

        if (err) return done(err);
        done();
      });
  });

  it('should get menu for a specific day that doesn\'t have a menu', (done) => {
    request(app)
      .get('/api/v1/menu?date=2018-04-25')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('No Menu is Available For This Day');

        if (err) return done(err);
        done();
      });
  });
});
