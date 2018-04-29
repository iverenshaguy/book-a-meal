import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import notFound from '../../utils/notFound';
import invalidID from '../../utils/invalidID';
import unAuthorized from '../../utils/unAuthorized';

const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';

describe('Meal Routes: Edit a meal option', () => {
  const newMeal = {
    title: 'Jollof Spaghetti, Plantain and Chicken',
    description: 'Contains Sea Food',
    price: 2400,
    imageURL: 'images.com/imgurl4.jpeg',
  };

  const badMeal = {
    title: '',
    description: 'Contains %%% Sea Food',
    price: '23yu50',
    imageURL: 'images.com/imgurl1.jpeg',
    forVegetarians: 'no'
  };

  it('should edit a meal for authenticated user', (done) => {
    request(app)
      .put('/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
      .send(newMeal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.mealId).to.equal('91b6e41c-0972-4ac5-86da-4ac1f5226e83');

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid input', (done) => {
    request(app)
      .put('/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
      .send(badMeal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.title.msg).to.equal('Title cannot be empty');
        expect(res.body.errors.description.msg).to.equal('Text can only contain letters and the characters (,.\'-)');
        expect(res.body.errors.price.msg).to.equal('Price must be a number');
        expect(res.body.errors.forVegetarians.msg).to.equal('Accepts only true or false');

        if (err) return done(err);
        done();
      });
  });

  invalidID(
    'should return 422 error for invalid meal id', 'mealId',
    request(app), 'put', newMeal, '/api/v1/meals/efbbf4ad-c4ae-4134-928d-b5ee305ed5396478', adminMockToken
  );

  notFound(
    'should return 404 error for non-existent meal id',
    request(app), 'put', newMeal, '/api/v1/meals/efbbf4ad-c4ae-4134-928d-b5ee305ed539', adminMockToken
  );

  notAdmin(
    'should return 403 error for authorized user ie non admin or caterer',
    request(app), 'put', '/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83'
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'put', '/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83'
  );
});
