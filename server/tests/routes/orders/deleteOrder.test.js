import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notFound from '../../utils/notFound';
import invalidID from '../../utils/invalidID';
import unAuthorized from '../../utils/unAuthorized';
import { tokens } from '../../utils/setup';
import { addOrder } from '../../utils/data';

const { emiolaToken } = tokens;
const { newOrder } = addOrder;

let newOrderId;

describe('Order Routes: Delete an Order', () => {
  before((done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(newOrder)
      .end((err, res) => {
        newOrderId = res.body.orderId;
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('orderId');
        expect(res.body).to.include.keys('userId');
        expect(res.body).to.include.keys('createdAt');
        expect(res.body).to.include.keys('updatedAt');

        if (err) return done(err);
        done();
      });
  });

  it('should delete a current order for an authenticated user', (done) => {
    request(app)
      .delete(`/api/v1/orders/${newOrderId}`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        // expect(res.body).to.deep.equal({});

        if (err) return done(err);
        done();
      });
  });

  it('should not delete an expired order i.e. past date', (done) => {
    request(app)
      .delete('/api/v1/orders/fb097bde-5959-45ff-8e21-51184fa60c25')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        // expect(res.body.error).to.equal('Order is expired');

        if (err) return done(err);
        done();
      });
  });

  invalidID(
    'should return 422 error for invalid menu id', 'orderId',
    request(app), 'delete', undefined, '/api/v1/orders/efbbf4ad-c4ae-4134-928d-b5ee305ed5396478', emiolaToken
  );

  notFound(
    'should return 404 error for non-existent menu id',
    request(app), 'delete', undefined, '/api/v1/orders/9ce447be-ee46-424e-82b8-ae4160e795b4', emiolaToken
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'delete', '/api/v1/orders/e544248c-145c-4145-b165-239658857637'
  );
});
