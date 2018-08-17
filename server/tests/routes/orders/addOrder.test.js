import request from 'supertest';
import { expect } from 'chai';
import moment from 'moment';
import mockDate from 'mockdate';
import app from '../../../src/app';
import unAuthorized from '../../utils/unAuthorized';
import { order as mockData } from '../../utils/mockData';
import { tokens } from '../../utils/setup';

const { emiolaToken } = tokens;

const { badOrderDetails, newOrderDetails } = mockData;

const currentDay = moment().format('YYYY-MM-DD');


describe('Order Routes: Add an Order', () => {
  it('should add an order for an authenticated user', (done) => {
    mockDate.set(new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));

    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send({ ...newOrderDetails })
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
    mockDate.set(new Date(currentDay).getTime() + (60 * 60 * 18 * 1000));

    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(newOrderDetails)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Meals can only be ordered from 8:30am to 4:00pm');

        if (err) return done(err);
        done();
      });
  });

  it('should not add an order when meal isn\'t in menu for the day', (done) => {
    mockDate.set(new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));

    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send({ meals: [{ mealId: '46ced7aa-eed5-4462-b2c0-153f31589bdd', quantity: 1 }] })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.errors.meals.msg).to.equal('Meal 46ced7aa-eed5-4462-b2c0-153f31589bdd is not available');

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid input', (done) => {
    mockDate.set(new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));

    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .send(badOrderDetails)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.status.msg).to.equal('Status should not be provided');
        expect(res.body.errors.meals.msg).to.equal('Meals must be specified');
        expect(res.body.errors.deliveryAddress.msg).to.equal('Delivery Address field cannot be left blank');
        expect(res.body.errors.deliveryPhoneNo.msg)
          .to.equal('Delivery Phone Number must be in the format 080xxxxxxxx');

        if (err) return done(err);
        done();
      });
  });

  unAuthorized('post', '/api/v1/orders');
});
