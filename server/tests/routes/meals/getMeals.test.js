import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import unAuthorized from '../../utils/unAuthorized';
import { tokens } from '../../utils/setup';

const { foodCircleToken } = tokens;

describe('Meal Routes: Get all meals', () => {
  it('should get all meals for authenticated user', (done) => {
    request(app)
      .get('/api/v1/meals')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.meals.length).to.equal(5);
        expect(res.body).to.include.keys('metadata');

        if (err) return done(err);
        done();
      });
  });

  notAdmin(
    'should return 403 error for authorized user ie non admin or caterer',
    request(app), 'get', '/api/v1/meals'
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'get', '/api/v1/meals'
  );
});
