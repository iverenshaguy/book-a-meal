import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import menuDB from '../../../data/menu.json';
import unAuthorized from '../../utils/unAuthorized';
import { addOrder as data, currentDay, userMockToken, adminMockToken } from '../../utils/data';

const menu = {
  date: currentDay,
  meals: [
    '81211c24-51c0-46ec-b1e0-18db55880958',
    '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
    'baa0412a-d167-4d2b-b1d8-404cb8f02631'
  ]
};

const {
  newOrder
} = data;

describe('Order Routes: Add an Order', () => {
  before((done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
      .send(menu)
      .end((err, res) => {
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
      .send(newOrder)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('orderId');
        expect(res.body).to.include.keys('userId');
        expect(res.body).to.include.keys('created');
        expect(res.body).to.include.keys('updated');
        expect(res.body.meals.length).to.equal(2);
        expect(res.body.meals[0]).to.include.keys('price');

        if (err) return done(err);
        done();
      });
  });

  it('should not add an order when meal isn\'t in menu for the date', (done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', userMockToken)
      .send({ ...newOrder, meals: ['46ced7aa-eed5-4462-b2c0-153f31589bdd'], date: '2018-05-11' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body.errors.meals.msg).to.equal('Meal 46ced7aa-eed5-4462-b2c0-153f31589bdd is not available');

        if (err) return done(err);
        done();
      });
  });

  // it('should return errors for invalid input', (done) => {
  //   request(app)
  //     .post('/api/v1/orders')
  //     .set('Accept', 'application/json')
  //     .set('authorization', userMockToken)
  //     .send(badOrder)
  //     .end((err, res) => {
  //       expect(res.statusCode).to.equal(422);
  //       expect(res.body).to.be.an('object');
  //       expect(res.body.errors.meals.msg).to.equal('Meals must be specified');
  //       expect(res.body.errors.deliveryAddress.msg).to.equal('Delivery Address cannot be empty');
  //       expect(res.body.errors.deliveryPhoneNo.msg)
  // .to.equal('Delivery Phone Number must be in the format +2348134567890');

  //       if (err) return done(err);
  //       done();
  //     });
  // });

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'post', '/api/v1/orders'
  );
});
