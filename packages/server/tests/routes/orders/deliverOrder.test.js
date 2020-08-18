import request from 'supertest';
import { expect } from 'chai';
import db from '../../../src/models';
import app from '../../../src/app';
import notFound from '../../utils/notFound';
import invalidID from '../../utils/invalidID';
import unAuthorized from '../../utils/unAuthorized';
import { order as mockData } from '../../utils/mockData';
import { tokens } from '../../utils/setup';

const { emiolaToken, foodCircleToken } = tokens;

const { newOrderDetails } = mockData;

let firstOrderId, secondOrderId;

describe('Order Routes: Deliver an Order', () => {
  before((done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(newOrderDetails)
      .end((err, res) => {
        firstOrderId = res.body.id;
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('id');

        if (err) return done(err);
        done();
      });
  });

  before((done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(newOrderDetails)
      .end((err, res) => {
        secondOrderId = res.body.id;
        db.Order.findOne({ where: { orderId: res.body.id } }).then(order => order.addMeal('46ced7aa-eed5-4462-b2c0-153f31589bdd', { through: { quantity: 1 } }).then(() => order.update({ status: 'pending' }).then(() => {
          if (err) return done(err);
          done();
        })));
      });
  });

  it('should deliver order belonging to caterer', (done) => {
    db.Order.findOne({ where: { orderId: firstOrderId } }).then(order => order.update({ status: 'pending' }).then(() => {
      request(app)
        .post(`/api/v1/orders/${firstOrderId}/deliver`)
        .set('Accept', 'application/json')
        .set('authorization', foodCircleToken)
        .send({ delivered: true })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.meals[0].delivered).to.equal(true);

          if (err) return done(err);
          done();
        });
    }));
  });

  it('should change caterer\'s order status to delivered when all his meals have been delivered', (done) => {
    request(app)
      .post(`/api/v1/orders/${secondOrderId}/deliver`)
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ delivered: true })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.equal('delivered');

        if (err) return done(err);
        done();
      });
  });

  it('should not change order status to delivered when all meals haven\'t been delivered', async () => {
    try {
      const order = await db.Order.findOne({ where: { orderId: secondOrderId } });

      expect(order.get().status).to.equal('pending');
    } catch (err) {
      if (err) return err;
    }
  });

  it('should not modify an expired/delivered order', (done) => {
    db.Order.findOne({ where: { orderId: firstOrderId } }).then(order => order.update({ status: 'delivered' }).then(() => {
      request(app)
        .post(`/api/v1/orders/${firstOrderId}/deliver`)
        .set('Accept', 'application/json')
        .set('authorization', foodCircleToken)
        .send({ delivered: true })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.error).to.equal('Item Not Found');

          if (err) return done(err);
          done();
        });
    }));
  });

  it('should not modify a canceled order', (done) => {
    db.Order.findOne({ where: { orderId: firstOrderId } }).then(order => order.update({ status: 'canceled' }).then(() => {
      request(app)
        .post(`/api/v1/orders/${firstOrderId}/deliver`)
        .set('Accept', 'application/json')
        .set('authorization', foodCircleToken)
        .send({ delivered: true })
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.error).to.equal('Item Not Found');

          if (err) return done(err);
          done();
        });
    }));
  });

  it('should return errors for invalid input', (done) => {
    request(app)
      .post(`/api/v1/orders/${firstOrderId}/deliver`)
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ delivered: 'tru' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors.delivered.msg).to.equal('True and False are the only available options');

        if (err) return done(err);
        done();
      });
  });

  it('should return error when delivery status isn\'t specified', (done) => {
    request(app)
      .post(`/api/v1/orders/${firstOrderId}/deliver`)
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send()
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors.delivered.msg).to.equal('Delivery status must be specified');

        if (err) return done(err);
        done();
      });
  });

  invalidID({
    type: 'orderId',
    method: 'post',
    url: '/api/v1/orders/efbbf4ad-c4ae-4134-928d-b5ee305ed5396478/deliver',
    token: foodCircleToken,
    data: { delivered: true },
  });

  notFound({
    method: 'post',
    url: '/api/v1/orders/9ce447be-ee46-424e-82b8-ae4160e795b4/deliver',
    token: foodCircleToken,
    data: { delivered: true },
  });

  unAuthorized('post', '/api/v1/orders/e544248c-145c-4145-b165-239658857637/deliver');
});
