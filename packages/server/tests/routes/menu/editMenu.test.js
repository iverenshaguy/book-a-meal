import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import notFound from '../../utils/notFound';
import invalidID from '../../utils/invalidID';
import unAuthorized from '../../utils/unAuthorized';
import { menu as mockData } from '../../utils/mockData';
import { tokens } from '../../utils/setup';

const { foodCircleToken } = tokens;
const { menuDetailsWithoutDate, menuDetailsWithBadDate } = mockData;

describe('Menu Routes: Edit menu', () => {
  it('should edit a menu for authenticated user', (done) => {
    request(app)
      .put('/api/v1/menu/6f27c0fb-19a9-4d9e-b5a1-d97c2d426ab5')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send(menuDetailsWithoutDate)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('id');
        expect(res.body).to.include.keys('date');
        expect(res.body.meals.length).to.equal(3);

        if (err) return done(err);
        done();
      });
  });

  it('should not edit expired menu for authenticated user', (done) => {
    request(app)
      .put('/api/v1/menu/15421f7a-0f82-4802-b215-e0e8efb6bfb3')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send(menuDetailsWithoutDate)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('Menu Expired');

        if (err) return done(err);
        done();
      });
  });

  it('should not add meal that doesn\'t belong to user to the menu', (done) => {
    request(app)
      .put('/api/v1/menu/6f27c0fb-19a9-4d9e-b5a1-d97c2d426ab5')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ ...menuDetailsWithoutDate, meals: ['46ced7aa-eed5-4462-b2c0-153f31589bdd'] })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors.meals.msg).to.equal('You don\'t have access to Meal 46ced7aa-eed5-4462-b2c0-153f31589bdd');

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid input', (done) => {
    request(app)
      .put('/api/v1/menu/a9fa6cb3-9f5e-46fa-b641-388f898ca824')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ ...menuDetailsWithBadDate, date: '2018-05-06' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.date.msg).to.equal('Menu dates cannot be changed');
        expect(res.body.errors.meals.msg).to.equal(' MealId 72a3417e-45c8-4559ie-8b74-8b5a61be8614 is invalid, MealId 8a65538d-f862-420e78-bcdc-80743df06578 is invalid, MealId f9eb7652-125a-4bcbuu-ad81-02f84901cdc3 is invalid');

        if (err) return done(err);
        done();
      });
  });

  it('should return error for an empty PUT request', (done) => {
    request(app)
      .put('/api/v1/menu/6f27c0fb-19a9-4d9e-b5a1-d97c2d426ab5')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({})
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('Empty PUT Requests Are Not Allowed');

        if (err) {
          return done(err);
        }
        done();
      });
  });

  invalidID({
    type: 'menuId',
    method: 'put',
    url: '/api/v1/menu/efbbf4ad-c4ae-4134-928d-b5ee305ed5396478',
    token: foodCircleToken
  });

  notFound({
    method: 'put',
    url: '/api/v1/menu/4f579f84-53e4-4fc5-a362-956aa36fbfb8',
    token: foodCircleToken,
    data: menuDetailsWithoutDate,
  });

  notAdmin('put', '/api/v1/menu/15421f7a-0f82-4802-b215-e0e8efb6bfb3');

  unAuthorized('put', '/api/v1/menu/15421f7a-0f82-4802-b215-e0e8efb6bfb3');
});
