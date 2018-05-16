import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import db from '../../../src/models';
import { addOrder } from '../../utils/data';
import { tokens } from '../../utils/setup';

const { emiolaToken } = tokens;

const { newOrder } = addOrder;

describe('Order Routes: Modify an Order', () => {
  it('should update created order to delivered after the expiry time', (done) => {
    process.env.EXPIRY = 2000;

    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(newOrder)
      .end((err, res) => {
        setTimeout(async () => {
          try {
            const order = await db.Order.findOne({ where: { orderId: res.body.id } });
            expect(order.status).to.equal('delivered');
          } catch (err) {
            return err;
          }
          done();
        }, 7000);
      });
  });

  it('should not update a canceled order status to delivered', (done) => {
    process.env.EXPIRY = 10000;
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(newOrder)
      .end(async (err, res) => {
        try {
          const order = await db.Order.findOne({ where: { orderId: res.body.id } });
          order.update({ status: 'canceled' }).then(async () => {
            setTimeout(async () => {
              try {
                const reloadedOrder = await db.Order
                  .findOne({ where: { orderId: res.body.id } });
                expect(reloadedOrder.status).to.not.equal('delivered');
              } catch (err) {
                return err;
              }
              done();
            }, 12000);
          });
        } catch (err) {
          return err;
        }
      });
  });
});
