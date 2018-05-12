import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import unAuthorized from '../../utils/unAuthorized';
import { tokens } from '../../utils/setup';

const { foodCircleToken, emiolaToken, fakeUserToken } = tokens;

describe('Order Routes: Get All Orders', () => {
  describe('Get Caterer Orders', () => {
    it('should get all caterer\'s orders', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('Accept', 'application/json')
        .set('authorization', foodCircleToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.length).to.equal(2);

          if (err) return done(err);
          done();
        });
    });

    it('should not get orders for unauthorized user', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('Accept', 'application/json')
        .set('authorization', fakeUserToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.error).to.equal('Unauthorized');

          if (err) return done(err);
          done();
        });
    });

    unAuthorized(
      'should return 401 error for user without token',
      request(app), 'get', '/api/v1/orders'
    );
  });

  describe('Get User Orders', () => {
    it('should get all orders in the app for user', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('Accept', 'application/json')
        .set('authorization', emiolaToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.length).to.equal(1);
          expect(res.body[0].orderId).to.equal('fb097bde-5959-45ff-8e21-51184fa60c25');

          if (err) return done(err);
          done();
        });
    });

    unAuthorized(
      'should return 401 error for user without token',
      request(app), 'get', '/api/v1/orders'
    );
  });
});
