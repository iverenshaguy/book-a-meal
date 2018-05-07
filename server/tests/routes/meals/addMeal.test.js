import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import unAuthorized from '../../utils/unAuthorized';
import { addMeal as data } from '../../utils/data';
import { tokens } from '../../utils/setup';

const { foodCircleToken } = tokens;
const { newMeal, badMeal } = data;

describe('Meal Routes: Add a meal option', () => {
  it('should add a meal for authenticated user', (done) => {
    request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send(newMeal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.include.keys('mealId');
        expect(res.body).to.include.keys('created');
        expect(res.body).to.include.keys('updated');
        expect(res.body.title).to.equal('Oriental Fried Rice and Turkey');

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid input', (done) => {
    request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send(badMeal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.title.msg).to.equal('Meal already exists');
        expect(res.body.errors.description.msg).to.equal('Text can only contain letters and the characters (,.\'-)');
        expect(res.body.errors.price.msg).to.equal('Price cannot be empty');
        expect(res.body.errors.forVegetarians.msg).to.equal('Accepts only true or false');

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid price, 0', (done) => {
    request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ ...badMeal, price: 0 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.price.msg).to.equal('Price must not be less than 200');

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid price, -25', (done) => {
    request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ ...badMeal, price: -25 })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.price.msg).to.equal('Price must not be less than 200');

        if (err) return done(err);
        done();
      });
  });

  notAdmin(
    'should return 403 error for authorized user ie non admin or caterer',
    request(app), 'post', '/api/v1/meals'
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'post', '/api/v1/meals'
  );
});
