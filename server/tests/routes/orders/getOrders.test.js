import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import unAuthorized from '../../utils/unAuthorized';

const userMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';
const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';

describe('Order Routes: Get All Orders', () => {
  describe('Get Caterer Orders', () => {
    it('should get all orders in the app for caterer', (done) => {
      request(app)
        .get('/api/v1/orders')
        .set('Accept', 'application/json')
        .set('authorization', adminMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(5);
          expect(res.body.orders[4].orderId).to.equal('6ed0963f-9663-4fe2-8ad4-2f06c6294482');
          expect(res.body.orders[0].orderId).to.equal('fb097bde-5959-45ff-8e21-51184fa60c25');
          expect(res.body.metadata).to.deep.equal({
            pages: [1],
            totalCount: 5,
            itemsPerPage: 5,
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
          expect(res.body.orders.length).to.equal(5);

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

    notAdmin(
      'should return 403 error for authorized user ie non admin or caterer',
      request(app), 'get', '/api/v1/orders'
    );

    unAuthorized(
      'should return 401 error for user without token',
      request(app), 'get', '/api/v1/orders'
    );
  });

  describe('Get User Orders', () => {
    it('should get all orders in the app for user', (done) => {
      request(app)
        .get('/api/v1/users/a09a5570-a3b2-4e21-94c3-5cf483dbd1ac/orders')
        .set('Accept', 'application/json')
        .set('authorization', userMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.orders.length).to.equal(2);
          expect(res.body.orders[0].orderId).to.equal('fb097bde-5959-45ff-8e21-51184fa60c25');
          expect(res.body.orders[1].orderId).to.equal('e544248c-145c-4145-b165-239658857637');
          expect(res.body.metadata).to.deep.equal({
            pages: [1],
            totalCount: 2,
            itemsPerPage: 2,
            page: 1,
            lastPage: 1,
            firstPage: 1
          });

          if (err) return done(err);
          done();
        });
    });

    unAuthorized(
      'should return 401 error for user without token',
      request(app), 'get', '/api/v1/users/a09a5570-a3b2-4e21-94c3-5cf483dbd1ac/orders'
    );
  });
});
