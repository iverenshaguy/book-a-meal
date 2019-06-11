import request from 'supertest';
import { expect } from 'chai';
import db from '../../../src/models';
import app from '../../../src/app';
import notFound from '../../utils/notFound';
import invalidID from '../../utils/invalidID';
import unAuthorized from '../../utils/unAuthorized';
import { order } from '../../utils/mockData';
import { tokens } from '../../utils/setup';

const { emiolaToken } = tokens;

const { newOrderDetails, badOrderDetails } = order;

let newMenuId;
let newOrderId;

describe('Order Routes: Modify an Order', () => {
  before((done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(newOrderDetails)
      .end((err, res) => {
        newOrderId = res.body.id;
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('id');

        if (err) return done(err);
        done();
      });
  });

  it('should modify an order for authenticated user with meals', (done) => {
    request(app)
      .put(`/api/v1/orders/${newOrderId}`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send({ ...newOrderDetails, meals: [{ mealId: 'baa0412a-d167-4d2b-b1d8-404cb8f02631', quantity: 1 }] })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('id');
        expect(res.body.meals.length).to.equal(1);
        expect(res.body.meals[0].id).to.equal('baa0412a-d167-4d2b-b1d8-404cb8f02631');

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

  it('should not modify user details for an order that is being canceled', (done) => {
    request(app)
      .put(`/api/v1/orders/${newOrderId}`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send({ deliveryPhoneNo: '08134567891', status: 'canceled' })
      .end((err, res) => {
        db.User.findOne({ where: { phoneNo: '08134567891' } }).then((user) => {
          expect(user).to.equal(null);
          expect(res.body.status).to.equal('canceled');

          if (err) return done(err);
          done();
        });
      });
  });

  it('should not modify an expired order', (done) => {
    request(app)
      .put('/api/v1/orders/fb097bde-5959-45ff-8e21-51184fa60c25')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(newOrderDetails)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.error).to.equal('Order is expired');

        if (err) return done(err);
        done();
      });
  });

  it('should not modify a pending order', (done) => {
    db.Order.findOne({ where: { orderId: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }).then(foundOrder =>
      foundOrder.update({ status: 'pending' }).then(() => {
        request(app)
          .put('/api/v1/orders/fb097bde-5959-45ff-8e21-51184fa60c25')
          .set('Accept', 'application/json')
          .set('authorization', emiolaToken)
          .send(newOrderDetails)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equal('Order is being processed and cannot be edited');

            if (err) return done(err);
            done();
          });
      }));
  });

  it('should not modify a canceled order', (done) => {
    db.Order.findOne({ where: { orderId: 'fb097bde-5959-45ff-8e21-51184fa60c25' } }).then(foundOrder =>
      foundOrder.update({ status: 'canceled' }).then(() => {
        request(app)
          .put('/api/v1/orders/fb097bde-5959-45ff-8e21-51184fa60c25')
          .set('Accept', 'application/json')
          .set('authorization', emiolaToken)
          .send(newOrderDetails)
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body.error).to.equal('Order has been canceled');

            if (err) return done(err);
            done();
          });
      }));
  });

  it('should return errors for invalid input', (done) => {
    request(app)
      .put(`/api/v1/orders/${newOrderId}`)
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send({ ...badOrderDetails, date: '' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.deliveryAddress.msg).to.equal('If provided, delivery address field cannot be left blank');
        expect(res.body.errors.deliveryPhoneNo.msg).to.equal('Delivery Phone Number must be in the format 080xxxxxxxx');

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

  invalidID({
    type: 'orderId',
    method: 'put',
    url: '/api/v1/orders/efbbf4ad-c4ae-4134-928d-b5ee305ed5396478',
    token: emiolaToken,
    data: { ...newOrderDetails, menuId: newMenuId },
  });

  notFound({
    method: 'put',
    url: '/api/v1/orders/9ce447be-ee46-424e-82b8-ae4160e795b4',
    token: emiolaToken,
    data: { ...newOrderDetails, menuId: '8356954a-9a42-4616-8079-887a73455a7f' },
  });

  unAuthorized('put', '/api/v1/orders/e544248c-145c-4145-b165-239658857637');
});
