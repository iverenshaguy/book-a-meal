import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import db from '../../../src/models';
import { order as mockData } from '../../utils/mockData';
import { tokens } from '../../utils/setup';

const { emiolaToken } = tokens;

const { newOrderDetails } = mockData;

describe('Order Routes: Modify an Order', () => {
  it('should update created order to pending after the expiry time', (done) => {
    process.env.EXPIRY = 10;

    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(newOrderDetails)
      .end((err, res) => {
        setTimeout(() => {
          try {
            db.Order.findOne({ where: { orderId: res.body.id } }).then((newOrder) => {
              expect(newOrder.status).to.equal('pending');
            });
          } catch (err) {
            return err;
          }
          done();
        }, 1000);
      });
  });

  it('should not update a canceled order status to pending', (done) => {
    process.env.EXPIRY = 10;

    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(newOrderDetails)
      .end(async (err, res) => {
        try {
          const order = await db.Order.findOne({ where: { orderId: res.body.id } });
          order.update({ status: 'canceled' }).then(() => {
            setTimeout(() => {
              try {
                db.Order.findOne({ where: { orderId: res.body.id } }).then((updatedOrder) => {
                  expect(updatedOrder.status).to.not.equal('pending');
                });
              } catch (err) {
                return err;
              }
              done();
            }, 1000);
          });
        } catch (err) {
          return err;
        }
      });
  });
});
