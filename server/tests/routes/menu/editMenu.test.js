import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import notFound from '../../utils/notFound';
import invalidID from '../../utils/invalidID';
import unAuthorized from '../../utils/unAuthorized';
import { addMenu as data, tomorrow } from '../../utils/data';
import { tokens } from '../../utils/setup';

const { foodCircleToken } = tokens;
const { menu1, badMenu } = data;
let newMenuId;

describe('Menu Routes: Edit menu', () => {
  before((done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ ...menu1, date: tomorrow })
      .end((err, res) => {
        newMenuId = res.body.menuId;
        expect(res.statusCode).to.equal(201);

        if (err) return done(err);
        done();
      });
  });

  it('should edit a menu for authenticated user', (done) => {
    request(app)
      .put(`/api/v1/menu/${newMenuId}`)
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send(menu1)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('menuId');
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
      .send(menu1)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.error).to.equal('Menu Expired');

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid input', (done) => {
    request(app)
      .put('/api/v1/menu/a9fa6cb3-9f5e-46fa-b641-388f898ca824')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ ...badMenu, date: '2018-05-06' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.date.msg).to.equal('Menu dates cannot be changed');
        expect(res.body.errors.meals.msg).to.equal(' MealId 72a3417e-45c8-4559ie-8b74-8b5a61be8614 is invalid, MealId 8a65538d-f862-420e78-bcdc-80743df06578 is invalid, MealId f9eb7652-125a-4bcbuu-ad81-02f84901cdc3 is invalid');

        if (err) return done(err);
        done();
      });
  });

  invalidID(
    'should return 422 error for invalid meal id', 'menuId',
    request(app), 'put', menu1, '/api/v1/menu/efbbf4ad-c4ae-4134-928d-b5ee305ed5396478', foodCircleToken
  );

  notAdmin(
    'should return 403 error for authorized user ie non admin or caterer',
    request(app), 'put', '/api/v1/menu/15421f7a-0f82-4802-b215-e0e8efb6bfb3'
  );

  notFound(
    'should return 404 error for non-existent meal id',
    request(app), 'put', menu1, '/api/v1/menu/4f579f84-53e4-4fc5-a362-956aa36fbfb8', foodCircleToken
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'put', '/api/v1/menu/15421f7a-0f82-4802-b215-e0e8efb6bfb3'
  );
});
