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
          expect(res.body.orders.length).to.equal(3);
          expect(res.body.orders[0].orderId).to.equal('ce228787-f939-40a0-bfd3-6607ca8d2e53');
          expect(res.body.orders[1].orderId).to.equal('e5508b87-7975-493d-a900-3d47a69dad03');
          expect(res.body.orders[2].orderId).to.equal('6ed0963f-9663-4fe2-8ad4-2f06c6294482');
          expect(res.body.metadata).to.deep.equal({
            totalCount: 3,
            itemsPerPage: 3,
            page: 1,
            lastPage: 1,
            firstPage: 1
          });

          if (err) return done(err);
          done();
        });
    });

    it('should get all orders for day, 2018-05-06, in the app for caterer', (done) => {
      request(app)
        .get('/api/v1/orders?date=2018-05-06')
        .set('Accept', 'application/json')
        .set('authorization', adminMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(2);
          expect(res.body.orders[0].orderId).to.equal('ce228787-f939-40a0-bfd3-6607ca8d2e53');
          expect(res.body.orders[1].orderId).to.equal('6ed0963f-9663-4fe2-8ad4-2f06c6294482');

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
          expect(res.body.orders.length).to.equal(4);
          expect(res.body.orders[0].orderId).to.equal('fb097bde-5959-45ff-8e21-51184fa60c25');
          expect(res.body.orders[1].orderId).to.equal('ce228787-f939-40a0-bfd3-6607ca8d2e53');
          expect(res.body.orders[2].orderId).to.equal('e544248c-145c-4145-b165-239658857637');
          expect(res.body.orders[3].orderId).to.equal('e5508b87-7975-493d-a900-3d47a69dad03');
          expect(res.body.metadata).to.deep.equal({
            totalCount: 4,
            itemsPerPage: 4,
            page: 1,
            lastPage: 1,
            firstPage: 1
          });

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

    it('should get all orders for day, 2018-05-06, in the app for user', (done) => {
      request(app)
        .get('/api/v1/orders?date=2018-05-06')
        .set('Accept', 'application/json')
        .set('authorization', userMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(1);
          expect(res.body.orders[0].orderId).to.equal('ce228787-f939-40a0-bfd3-6607ca8d2e53');

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
