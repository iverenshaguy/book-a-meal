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
      '81211c24-51c0-46ec-b1e0-18db55880958',
      '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
      'baa0412a-d167-4d2b-b1d8-404cb8f02631'
    ]
  };

  const newOrder = {
    mealId: '81211c24-51c0-46ec-b1e0-18db55880958',
    deliveryAddress: '4, Church Street, Yaba',
    deliveryPhoneNo: '+2348134567890',
    quantity: 4
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

        if (err) return done(err);
        done();
      });
  });

  it('should add an order for authenticated user', (done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', userMockToken)
      .send({ ...newOrder, menuId: newMenuId })
      .end((err, res) => {
        newOrderId = res.body.orderId;
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('orderId');
        expect(res.body).to.include.keys('userId');
        expect(res.body).to.include.keys('created');
        expect(res.body).to.include.keys('updated');

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
        expect(res.body.error).to.equal('Order is expired');

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
