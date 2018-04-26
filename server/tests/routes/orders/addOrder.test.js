import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import unAuthorized from '../../utils/unAuthorized';

const userMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';


describe('Order Routes: Add an Order', () => {
  const newOrder = {
    menuId: '15421f7a-0f82-4802-b215-e0e8efb6bfb3',
    deliveryAddress: '4, Church Street, Yaba',
    deliveryPhoneNo: '+2348134567890',
    quantity: 2
  };

  const orderwithoutQuantity = {
    menuId: '15421f7a-0f82-4802-b215-e0e8efb6bfb3',
    deliveryAddress: '4, Church Street, Yaba',
    deliveryPhoneNo: '+2348134567890',
  };

  const badOrder = {
    menuId: '15421f7a-0f82-4802-b215-e0e8efb6bfb38932',
    deliveryAddress: '',
    deliveryPhoneNo: 'disdod',
    quantity: '2'
  };

  it('should add a order for authenticated user', (done) => {
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
        expect(res.body.menu.menuId).to.equal('15421f7a-0f82-4802-b215-e0e8efb6bfb3');
        expect(res.body.menu).to.include.keys('meals');

        if (err) return done(err);
        done();
      });
  });

  it('should add a order using default quantity 1', (done) => {
    request(app)
      .post('/api/v1/orders')
      .set('Accept', 'application/json')
      .set('authorization', userMockToken)
      .send(orderwithoutQuantity)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body.quantity).to.equal(1);

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
        expect(res.body.errors.menuId.msg).to.equal('Invalid ID');
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
