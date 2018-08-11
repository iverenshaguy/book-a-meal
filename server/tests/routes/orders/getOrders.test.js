import request from 'supertest';
import { expect } from 'chai';
import db from '../../../src/models';
import app from '../../../src/app';
import unAuthorized from '../../utils/unAuthorized';
import { order as mockData } from '../../utils/mockData';
import { tokens } from '../../utils/setup';

const { foodCircleToken, emiolaToken, fakeUserToken } = tokens;
const { newOrderDetails } = mockData;

describe('Order Routes: Get All Orders', () => {
  before((done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send({ ...newOrderDetails })
      .end((err, res) => {
        db.Order.findOne({ where: { orderId: res.body.id } }).then(order =>
          order.update({ status: 'pending' }).then(() => {
            expect(res.statusCode).to.equal(201);

            if (err) return done(err);
            done();
          }));
      });
  });

  describe('Get Caterer Orders', () => {
    it('should get all caterer\'s orders', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('Accept', 'application/json')
        .set('authorization', foodCircleToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(3);

          if (err) return done(err);
          done();
        });
    });

    it('should get all caterer\'s orders for a particular day', (done) => {
      request(app)
        .get('/api/v1/orders?date=2018-05-01')
        .set('Accept', 'application/json')
        .set('authorization', foodCircleToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(1);

          if (err) return done(err);
          done();
        });
    });

    it('should get empty caterer\'s orders for a particular day when no orders exist', (done) => {
      request(app)
        .get('/api/v1/orders?date=2018-01-06')
        .set('Accept', 'application/json')
        .set('authorization', foodCircleToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(0);

          if (err) return done(err);
          done();
        });
    });

    it('should get single order for caterer', (done) => {
      request(app)
        .get('/api/v1/orders/ce228787-f939-40a0-bfd3-6607ca8d2e53')
        .set('Accept', 'application/json')
        .set('authorization', foodCircleToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.id).to.equal('ce228787-f939-40a0-bfd3-6607ca8d2e53');
          expect(res.body.status).to.equal('delivered');

          if (err) return done(err);
          done();
        });
    });

    it('should return error if order doesn\'t exist for the caterer', (done) => {
      request(app)
        .get('/api/v1/orders/fb097bde-5959-45ff-8e21-51184fa60c22')
        .set('Accept', 'application/json')
        .set('authorization', foodCircleToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.error).to.equal('Item Not Found');

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

    describe('Bad Query', () => {
      it('should return errors for bad page and limit query', (done) => {
        request(app)
          .get('/api/v1/orders?date=2018-08-02&page=undefined&limit=ghjkl')
          .set('Accept', 'application/json')
          .set('authorization', foodCircleToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.include.keys('errors');
            expect(res.body.errors.limit.msg).to.equal('Limit must be an integer greater than 0');
            expect(res.body.errors.page.msg).to.equal('Page must be an integer greater than 0');

            if (err) return done(err);
            done();
          });
      });

      it('should return errors for null/0 page and limit query', (done) => {
        request(app)
          .get('/api/v1/orders?date=2018-08-02&page=null&limit=0')
          .set('Accept', 'application/json')
          .set('authorization', foodCircleToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.include.keys('errors');
            expect(res.body.errors.limit.msg).to.equal('Limit must be an integer greater than 0');
            expect(res.body.errors.page.msg).to.equal('Page must be an integer greater than 0');

            if (err) return done(err);
            done();
          });
      });

      it('should return errors for empty page and limit query', (done) => {
        request(app)
          .get('/api/v1/orders?date=2018-08-02&page=&limit=')
          .set('Accept', 'application/json')
          .set('authorization', foodCircleToken)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.include.keys('errors');
            expect(res.body.errors.limit.msg).to.equal('Limit cannot be blank');
            expect(res.body.errors.page.msg).to.equal('Page cannot be blank');

            if (err) return done(err);
            done();
          });
      });
    });

    unAuthorized('get', '/api/v1/orders');
  });

  describe('Get Customer Orders', () => {
    it('should get all orders in the app for customer', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('Accept', 'application/json')
        .set('authorization', emiolaToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(6);

          if (err) return done(err);
          done();
        });
    });

    it('should get customers orders in the app for a particular day', (done) => {
      request(app)
        .get('/api/v1/orders?date=2018-04-06')
        .set('Accept', 'application/json')
        .set('authorization', emiolaToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(1);
          expect(res.body.orders[0].id).to.equal('fb097bde-5959-45ff-8e21-51184fa60c25');

          if (err) return done(err);
          done();
        });
    });

    it('should get single order for customer', (done) => {
      request(app)
        .get('/api/v1/orders/fb097bde-5959-45ff-8e21-51184fa60c25')
        .set('Accept', 'application/json')
        .set('authorization', emiolaToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.id).to.equal('fb097bde-5959-45ff-8e21-51184fa60c25');
          expect(res.body.status).to.equal('canceled');

          if (err) return done(err);
          done();
        });
    });

    it('should return error if order doesn\'t exist for the customer', (done) => {
      request(app)
        .get('/api/v1/orders/fb097bde-5959-45ff-8e21-51184fa60c22')
        .set('Accept', 'application/json')
        .set('authorization', emiolaToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.error).to.equal('Item Not Found');

          if (err) return done(err);
          done();
        });
    });

    unAuthorized('get', '/api/v1/orders');
  });
});
