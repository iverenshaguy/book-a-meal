import request from 'supertest';
import { expect } from 'chai';
import moment from 'moment';
import app from '../../../src/app';
import notFound from '../../utils/notFound';
import invalidID from '../../utils/invalidID';
import unAuthorized from '../../utils/unAuthorized';

const userMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';
const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';
const currentDay = moment().format('YYYY-MM-DD');
let newMenuId, newOrderId;


describe('Order Routes: Delete an Order', () => {
  const menu = {
    date: currentDay,
    meals: [
      '72a3417e-45c8-4559-8b74-8b5a61be8614',
      '8a65538d-f862-420e-bcdc-80743df06578',
      'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
    ]
  };

  const order = {
    deliveryAddress: '4, Church Street, Yaba',
    deliveryPhoneNo: '+2348134567890',
    quantity: 2
  };

  it('should add a menu for authenticated user, for the current day', (done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
      .send(menu)
      .end((err, res) => {
        newMenuId = res.body.menuId;
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('menuId');
        expect(res.body).to.include.keys('date');
        expect(res.body.date).to.equal(currentDay);
        expect(res.body.meals[0].mealId).to.equal('72a3417e-45c8-4559-8b74-8b5a61be8614');

        if (err) return done(err);
        done();
      });
  });

  it('should add an order for authenticated user', (done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', userMockToken)
      .send({ ...order, menuId: newMenuId })
      .end((err, res) => {
        newOrderId = res.body.orderId;
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('orderId');
        expect(res.body).to.include.keys('userId');
        expect(res.body).to.include.keys('created');
        expect(res.body).to.include.keys('updated');
        expect(res.body.menu).to.include.keys('meals');

        if (err) return done(err);
        done();
      });
  });

  it('should delete a current order for an authenticated user', (done) => {
    request(app)
      .delete(`/api/v1/orders/${newOrderId}`)
      .set('Accept', 'application/json')
      .set('authorization', userMockToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(204);
        expect(res.body).to.deep.equal({});

        if (err) return done(err);
        done();
      });
  });

  it('should not delete an expired order i.e. past date', (done) => {
    request(app)
      .delete('/api/v1/orders/e5508b87-7975-493d-a900-3d47a69dad03')
      .set('Accept', 'application/json')
      .set('authorization', userMockToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.error).to.equal('Order is Expired');

        if (err) return done(err);
        done();
      });
  });

  invalidID(
    'should return 422 error for invalid menu id', 'orderId',
    request(app), 'delete', undefined, '/api/v1/orders/efbbf4ad-c4ae-4134-928d-b5ee305ed5396478', userMockToken
  );

  notFound(
    'should return 404 error for non-existent menu id',
    request(app), 'delete', undefined, '/api/v1/orders/9ce447be-ee46-424e-82b8-ae4160e795b4', userMockToken
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'delete', '/api/v1/orders/e544248c-145c-4145-b165-239658857637'
  );
});
