import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notFound from '../../utils/notFound';
import invalidID from '../../utils/invalidID';
import menuDB from '../../../data/menu.json';
import unAuthorized from '../../utils/unAuthorized';
import { addOrder, currentDay, userMockToken, adminMockToken } from '../../utils/data';

const { newOrder, orderWithExpiredMenu, badOrder } = addOrder;

const menu = {
  date: currentDay,
  meals: [
    '81211c24-51c0-46ec-b1e0-18db55880958',
    '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
    'baa0412a-d167-4d2b-b1d8-404cb8f02631'
  ]
};

let newMenuId, newOrderId;


describe('Order Routes: Modify an Order', () => {
  before((done) => {
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

  after(() => {
    // delete menu for today after test
    const index = menuDB.findIndex(item => item.date === currentDay);

    menuDB.splice(index, 1);
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

  it('should modify an order for authenticated user', (done) => {
    request(app)
      .put(`/api/v1/orders/${newOrderId}`)
      .set('Accept', 'application/json')
      .set('authorization', userMockToken)
      .send({ ...newOrder, mealId: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('orderId');
        expect(res.body).to.include.keys('userId');
        expect(res.body).to.include.keys('created');
        expect(res.body).to.include.keys('updated');
        expect(res.body.quantity).to.equal(2);
        expect(res.body.mealId).to.equal('36d525d1-efc9-4b75-9999-3e3d8dc64ce3');

        if (err) return done(err);
        done();
      });
  });

  it('should not modify an expired order i.e. past date', (done) => {
    request(app)
      .put('/api/v1/orders/e5508b87-7975-493d-a900-3d47a69dad03')
      .set('Accept', 'application/json')
      .set('authorization', userMockToken)
      .send({ ...newOrder, menuId: newMenuId })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.error).to.equal('Order is expired');

        if (err) return done(err);
        done();
      });
  });

  it('should not add meal in expired menu/future menu when modifying order', (done) => {
    request(app)
      .put(`/api/v1/orders/${newOrderId}`)
      .set('Accept', 'application/json')
      .set('authorization', userMockToken)
      .send(orderWithExpiredMenu)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.error).to.equal('Meal is unavailable');

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid input', (done) => {
    request(app)
      .put('/api/v1/orders/e544248c-145c-4145-b165-239658857637')
      .set('Accept', 'application/json')
      .set('authorization', userMockToken)
      .send(badOrder)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.menuId.msg).to.equal('Invalid ID');
        expect(res.body.errors.deliveryAddress.msg).to.equal('Delivery Address cannot be empty');
        expect(res.body.errors.deliveryPhoneNo.msg).to.equal('Delivery Phone Number must be in the format +2348134567890');

        if (err) return done(err);
        done();
      });
  });

  invalidID(
    'should return 422 error for invalid menu id', 'orderId',
    request(app), 'put', { ...newOrder, menuId: newMenuId }, '/api/v1/orders/efbbf4ad-c4ae-4134-928d-b5ee305ed5396478', userMockToken
  );

  notFound(
    'should return 404 error for non-existent menu id',
    request(app), 'put', { ...newOrder, menuId: '8356954a-9a42-4616-8079-887a73455a7f' }, '/api/v1/orders/9ce447be-ee46-424e-82b8-ae4160e795b4', userMockToken
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'put', '/api/v1/orders/e544248c-145c-4145-b165-239658857637'
  );
});
