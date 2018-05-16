import request from 'supertest';
import { expect } from 'chai';
import moment from 'moment';
import app from '../../../src/app';
import unAuthorized from '../../utils/unAuthorized';
import { addOrder as data } from '../../utils/data';
import { tokens } from '../../utils/setup';

const { emiolaToken } = tokens;

const { badOrder, newOrder } = data;
const currentHour = moment().hour();
const currentMin = moment().minute();

describe('Order Routes: Add an Order', () => {
  let env;
  before(() => {
    env = process.env; // eslint-disable-line

    process.env.OPENING_HOUR = currentHour - 1;
    process.env.OPENING_MINUTE = currentMin;
    process.env.CLOSING_HOUR = currentHour + 1;
    process.env.CLOSING_MINUTE = 0;
  });

  after(() => {
    process.env = env;
  });

  it('should add an order for authenticated user', (done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send({ ...newOrder })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('id');
        expect(res.body.meals.length).to.equal(2);
        expect(res.body.meals[0].quantity).to.equal(2);
        expect(res.body.meals[0]).to.include.keys('price');

        if (err) return done(err);
        done();
      });
  });

  it('should not add an order when office is closed', (done) => {
    process.env.OPENING_HOUR = currentHour - 2;
    process.env.OPENING_MINUTE = currentMin;
    process.env.CLOSING_HOUR = currentHour - 1;
    process.env.CLOSING_MINUTE = 0;

    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(newOrder)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Meals can only be ordered from 8:30am to 4:00pm');

        if (err) return done(err);
        done();
      });
  });

  it('should not add an order when meal isn\'t in menu for the day', (done) => {
    process.env.OPENING_HOUR = currentHour - 1;
    process.env.OPENING_MINUTE = currentMin;
    process.env.CLOSING_HOUR = currentHour + 1;
    process.env.CLOSING_MINUTE = 0;

    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send({ meals: ['46ced7aa-eed5-4462-b2c0-153f31589bdd'] })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors.meals.msg).to.equal('Meal 46ced7aa-eed5-4462-b2c0-153f31589bdd is not available');

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid input', (done) => {
    process.env.OPENING_HOUR = currentHour - 1;
    process.env.OPENING_MINUTE = currentMin;
    process.env.CLOSING_HOUR = currentHour + 1;
    process.env.CLOSING_MINUTE = 0;

    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(badOrder)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.status.msg).to.equal('Status should not be provided');
        expect(res.body.errors.meals.msg).to.equal('Meals must be specified');
        expect(res.body.errors.deliveryAddress.msg).to.equal('Delivery Address field cannot be left blank');
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
