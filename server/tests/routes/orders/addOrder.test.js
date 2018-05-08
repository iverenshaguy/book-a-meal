import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import unAuthorized from '../../utils/unAuthorized';
import { addOrder as data, tomorrow } from '../../utils/data';
import { tokens } from '../../utils/setup';

const { emiolaToken } = tokens;

const { badOrder, newOrder } = data;

describe('Order Routes: Add an Order', () => {
  it('should add an order for authenticated user', (done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send({ ...newOrder, date: tomorrow })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('orderId');
        expect(res.body).to.include.keys('userId');
        expect(res.body.meals.length).to.equal(3);
        expect(res.body.meals[0].quantity).to.equal(2);
        expect(res.body.meals[0].meal).to.include.keys('price');

        if (err) return done(err);
        done();
      });
  });

  it('should not add an order when meal isn\'t in menu for the date', (done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send({ ...newOrder, meals: ['46ced7aa-eed5-4462-b2c0-153f31589bdd'], date: '2018-05-11' })
      .end((err, res) => {
        console.log(res.body);
        expect(res.statusCode).to.equal(422);
        expect(res.body.errors.meals.msg).to.equal('Meal 46ced7aa-eed5-4462-b2c0-153f31589bdd is not available');

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid input', (done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(badOrder)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.meals.msg).to.equal('Meals must be specified');
        expect(res.body.errors.deliveryAddress.msg).to.equal('Delivery Address cannot be empty');
        expect(res.body.errors.deliveryPhoneNo.msg)
          .to.equal('Delivery Phone Number must be in the format +2348134567890');

        if (err) return done(err);
        done();
      });
  });

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'post', '/api/v1/orders'
  );
});
