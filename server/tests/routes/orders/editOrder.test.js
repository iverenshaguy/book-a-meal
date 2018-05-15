import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notFound from '../../utils/notFound';
import invalidID from '../../utils/invalidID';
import unAuthorized from '../../utils/unAuthorized';
import { addOrder } from '../../utils/data';
import { tokens } from '../../utils/setup';

const { emiolaToken } = tokens;

const { newOrder, badOrder } = addOrder;

let newMenuId;
let newOrderId;

describe('Order Routes: Modify an Order', () => {
  // let env;
  // before(() => {
  //   env = process.env; // eslint-disable-line
  // });

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

  // after(() => {
  //   process.env = env;
  // });

  it('should modify an order for authenticated user with meals', (done) => {
    request(app)
      .put(`/api/v1/orders/${newOrderId}`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send({ ...newOrder, meals: ['baa0412a-d167-4d2b-b1d8-404cb8f02631'] })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('orderId');
        expect(res.body).to.include.keys('userId');
        expect(res.body.meals.length).to.equal(1);
        expect(res.body.meals[0].mealId).to.equal('baa0412a-d167-4d2b-b1d8-404cb8f02631');

        if (err) return done(err);
        done();
      });
  });

  it('should modify an order for authenticated user without meals', (done) => {
    request(app)
      .put(`/api/v1/orders/${newOrderId}`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send({ deliveryAddress: '5, Abakaliki Street, Lagos' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.deliveryAddress).to.equal('5, Abakaliki Street, Lagos');

        if (err) return done(err);
        done();
      });
  });

  it('should not modify an expired order i.e. past date', (done) => {
    request(app)
      .put('/api/v1/orders/fb097bde-5959-45ff-8e21-51184fa60c25')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(newOrder)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('Order is expired');

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid input', (done) => {
    request(app)
      .put(`/api/v1/orders/${newOrderId}`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send({ ...badOrder, date: '' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.deliveryAddress.msg).to.equal('If provided, delivery address field cannot be left blank');
        expect(res.body.errors.deliveryPhoneNo.msg).to.equal('Delivery Phone Number must be in the format +2348134567890');

        if (err) return done(err);
        done();
      });
  });

  it('should return error for empty request', (done) => {
    request(app)
      .put(`/api/v1/orders/${newOrderId}`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send()
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('Empty PUT Requests Are Not Allowed');

        if (err) return done(err);
        done();
      });
  });

  invalidID(
    'should return 400 error for invalid menu id', 'orderId',
    request(app), 'put', { ...newOrder, menuId: newMenuId }, '/api/v1/orders/efbbf4ad-c4ae-4134-928d-b5ee305ed5396478', emiolaToken
  );

  notFound(
    'should return 404 error for non-existent menu id',
    request(app), 'put',
    { ...newOrder, menuId: '8356954a-9a42-4616-8079-887a73455a7f' }, '/api/v1/orders/9ce447be-ee46-424e-82b8-ae4160e795b4', emiolaToken
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'put', '/api/v1/orders/e544248c-145c-4145-b165-239658857637'
  );
});
