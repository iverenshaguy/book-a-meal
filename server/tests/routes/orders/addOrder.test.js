import request from 'supertest';
import { expect } from 'chai';
import moment from 'moment';
import app from '../../../src/app';
import menuDB from '../../../data/menu.json';
import unAuthorized from '../../utils/unAuthorized';

const userMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';
const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';
const currentDay = moment().format('YYYY-MM-DD');
let newMenuId;

describe('Order Routes: Add an Order', () => {
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
    quantity: 2
  };

  const orderwithoutQuantity = {
    mealId: '81211c24-51c0-46ec-b1e0-18db55880958',
    deliveryAddress: '4, Church Street, Yaba',
    deliveryPhoneNo: '+2348134567890',
  };

  const badOrder = {
    menuId: '15421f7a-0f82-4802-b215-e0e8efb6bfb38932',
    deliveryAddress: '',
    deliveryPhoneNo: 'disdod',
    quantity: '2'
  };

  const orderWithExpiredMenu = {
    menuId: '1adfcfe7-c66d-42d2-82fd-39c1decd290a',
    mealId: 'a3c35e8f-da7a-4113-aa01-a9c0fc088539',
    deliveryAddress: '4, Church Street, Yaba',
    deliveryPhoneNo: '+2348134567890',
    quantity: 2
  };

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
        expect(res.body.meals[0].mealId).to.equal('81211c24-51c0-46ec-b1e0-18db55880958');

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
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('orderId');
        expect(res.body).to.include.keys('userId');
        expect(res.body).to.include.keys('created');
        expect(res.body).to.include.keys('updated');
        expect(res.body.mealId).to.equal('81211c24-51c0-46ec-b1e0-18db55880958');
        expect(res.body.menuId).to.equal(newMenuId);

        if (err) return done(err);
        done();
      });
  });

  it('should add an order using default quantity 1', (done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', userMockToken)
      .send({ ...orderwithoutQuantity, menuId: newMenuId })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.quantity).to.equal(1);

        if (err) return done(err);
        done();
      });
  });

  it('should not add meal in expired menu/future menu', (done) => {
    request(app)
      .post('/api/v1/orders')
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
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', userMockToken)
      .send(badOrder)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.mealId.msg).to.equal('MealId is required');
        expect(res.body.errors.deliveryAddress.msg).to.equal('Delivery Address cannot be empty');
        expect(res.body.errors.deliveryPhoneNo.msg).to.equal('Delivery Phone Number must be in the format +2348134567890');

        if (err) return done(err);
        done();
      });
  });

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'post', '/api/v1/orders'
  );
});
