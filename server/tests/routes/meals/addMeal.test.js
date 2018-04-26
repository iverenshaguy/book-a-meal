import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import unAuthorized from '../../utils/unAuthorized';

const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';


describe('Meal Routes: Add a meal option', () => {
  const newMeal = {
    title: 'Oriental Fried Rice and Turkey',
    description: 'Contains Sea Food',
    price: 2200,
    imageURL: 'images.com/imgurl1.jpeg',
    forVegetarians: false
  };

  const badMeal = {
    title: 'Jollof Spaghetti, Plantain and Turkey',
    description: 'Contains %%% Sea Food',
    price: '',
    imageURL: 'images.com/imgurl1.jpeg',
    forVegetarians: 'no'
  };

  it('should add a meal for authenticated user', (done) => {
    request(app)
      .post('/api/v1/meals')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
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
      .set('authorization', adminMockToken)
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

  notAdmin(
    'should return 403 error for authorized user ie non admin or caterer',
    request(app), 'post', '/api/v1/meals'
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'post', '/api/v1/meals'
  );
});
