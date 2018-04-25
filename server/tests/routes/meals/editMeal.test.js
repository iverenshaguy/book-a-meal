import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import notFound from '../../utils/notFound';
import unAuthorized from '../../utils/unAuthorized';

const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';

describe('Meal Routes: Edit a meal option', () => {
  const newMeal = {
    title: 'Jollof Spaghetti, Plantain and Chicken',
    description: 'Contains Sea Food',
    price: 2400,
    image: 'images.com/imgurl4.jpeg',
  };

  const badMeal = {
    title: '',
    description: 'Contains %%% Sea Food',
    price: '23yu50',
    image: 'images.com/imgurl1.jpeg',
    forVegetarians: 'no'
  };

  it('should edit a meal for authenticated user', (done) => {
    request(app)
      .put('/api/v1/meals/oepoepope043934342')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
      .send(newMeal)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.deep.equal({
          mealId: 'oepoepope043934342',
          title: 'Jollof Spaghetti, Plantain and Chicken',
          description: 'Contains Sea Food',
          price: 2400,
          image: 'images.com/imgurl4.jpeg',
          forVegetarians: false
        });

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid input', (done) => {
    request(app)
      .put('/api/v1/meals/oepoepope043934342')
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

  notFound(
    'should return 404 error for invalid meal id',
    request(app), 'put', newMeal, '/api/v1/meals/oepoepope043934342782389'
  );

  notAdmin(
    'should return 403 error for authorized user ie non admin or caterer',
    request(app), 'put', '/api/v1/meals/oepoepope043934342'
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'put', '/api/v1/meals/oepoepope043934342'
  );
});
