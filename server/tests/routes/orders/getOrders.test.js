import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import unAuthorized from '../../utils/unAuthorized';
import { userMockToken, adminMockToken } from '../../utils/data';

describe('Order Routes: Get All Orders', () => {
  describe('Get Caterer Orders', () => {
    it('should get all caterer\'s orders', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('Accept', 'application/json')
        .set('authorization', adminMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(1);
          expect(res.body.orders[0].meals.length).to.equal(1);
          expect(res.body.orders[0].meals[0].quantity).to.equal(1);
          expect(res.body.orders[0].orderId).to.equal('fb097bde-5959-45ff-8e21-51184fa60c25');

          if (err) return done(err);
          done();
        });
    });

    it('should get all orders for day, 2018-05-15, in the app for caterer', (done) => {
      request(app)
        .get('/api/v1/orders?date=2018-05-15')
        .set('Accept', 'application/json')
        .set('authorization', adminMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(1);
          expect(res.body.orders[0].meals.length).to.equal(1);
          expect(res.body.orders[0].orderId).to.equal('fb097bde-5959-45ff-8e21-51184fa60c25');

          if (err) return done(err);
          done();
        });
    });

    it('should get all orders for today in the app for caterer', (done) => {
      request(app)
        .get('/api/v1/orders?date=today')
        .set('Accept', 'application/json')
        .set('authorization', adminMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(0);

          if (err) return done(err);
          done();
        });
    });

    it('should not get orders for unauthorized user', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('Accept', 'application/json')
        .set('authorization', 'klopoopppppppjjlklklkjjk66788898')
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
        .set('authorization', userMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(1);
          expect(res.body.orders[0].orderId).to.equal('fb097bde-5959-45ff-8e21-51184fa60c25');

          if (err) return done(err);
          done();
        });
    });

    it('should get orders per day', (done) => {
      request(app)
        .get('/api/v1/orders?date=today')
        .set('Accept', 'application/json')
        .set('authorization', userMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(0);

          if (err) return done(err);
          done();
        });
    });

    it('should get all orders for day, 2018-05-15, in the app for user', (done) => {
      request(app)
        .get('/api/v1/orders?date=2018-05-15')
        .set('Accept', 'application/json')
        .set('authorization', userMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(1);
          expect(res.body.orders[0].orderId).to.equal('fb097bde-5959-45ff-8e21-51184fa60c25');

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
