import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import menuDB from '../../../data/menu.json';
import notAdmin from '../../utils/notAdmin';
import unAuthorized from '../../utils/unAuthorized';
import { addMenu as data, currentDay } from '../../utils/data';
import { tokens } from '../../utils/setup';

const { foodCircleToken } = tokens;
const {
  menu1, menu3, badMenu
} = data;

describe('Menu Routes: Add a new menu', () => {
  after(() => {
    // delete menu for today after test
    const index = menuDB.findIndex(item => item.date === currentDay);

    menuDB.splice(index, 1);
  });

  it('should add a menu for authenticated user, for the current day', (done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send(menu1)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('menuId');
        expect(res.body).to.include.keys('date');
        expect(res.body.date).to.equal(currentDay);
        expect(res.body.meals[0].mealId).to.equal('baa0412a-d167-4d2b-b1d8-404cb8f02631');

        if (err) return done(err);
        done();
      });
  });

  it('should not add a menu for authenticated user, for the current day again', (done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send(menu1)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.error).to.equal('Menu already exists for this day');

        if (err) return done(err);
        done();
      });
  });

  it('should not add menu for earlier date', (done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
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
      .set('authorization', foodCircleToken)
      .send(badMenu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.date.msg).to.equal('Date is invalid, valid format is YYYY-MM-DD');
        expect(res.body.errors.meals.msg).to.equal(' MealId 72a3417e-45c8-4559ie-8b74-8b5a61be8614 is invalid, MealId 8a65538d-f862-420e78-bcdc-80743df06578 is invalid, MealId f9eb7652-125a-4bcbuu-ad81-02f84901cdc3 is invalid');

        if (err) return done(err);
        done();
      });
  });

  it('should not add meal that\'s not for user', (done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ ...menu1, date: '2019-05-04', meals: ['46ced7aa-eed5-4462-b2c0-153f31589bdd'] })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.meals.msg).to.equal('Meal 46ced7aa-eed5-4462-b2c0-153f31589bdd doesn\'t exist');

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
