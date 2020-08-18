import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import notFound from '../../utils/notFound';
import invalidID from '../../utils/invalidID';
import invalidPUT from '../../utils/invalidPUT';
import unAuthorized from '../../utils/unAuthorized';
import { editMeal as mockData } from '../../utils/mockData';
import { tokens } from '../../utils/setup';

const { foodCircleToken } = tokens;
const { updatedMealDetails, invalidMealDetails } = mockData;

describe('Meal Routes: Edit a meal option', () => {
  it('should edit a meal for authenticated user', (done) => {
    request(app)
      .put('/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ ...updatedMealDetails, title: 'Plantain and Egg', price: undefined })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.id).to.equal('91b6e41c-0972-4ac5-86da-4ac1f5226e83');

        if (err) return done(err);
        done();
      });
  });

  it('should edit a meal and parse meal price for authenticated user', (done) => {
    request(app)
      .put('/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ ...updatedMealDetails, price: '1499.99' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.id).to.equal('91b6e41c-0972-4ac5-86da-4ac1f5226e83');

        if (err) return done(err);
        done();
      });
  });

  it('should return errors for invalid input', (done) => {
    request(app)
      .put('/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send(invalidMealDetails)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body.errors.title.msg).to.equal('If provided, meal title field cannot be left blank');
        expect(res.body.errors.description.msg).to.equal('Text can only contain letters and the characters (,.\'-)');
        expect(res.body.errors.price.msg).to.equal('Price must be a number or decimal');
        expect(res.body.errors.vegetarian.msg).to.equal('Accepts only true or false');

        if (err) return done(err);
        done();
      });
  });

  it('should return error for existent meal title', (done) => {
    process.env.EXPIRY = 5000;

    request(app)
      .put('/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ ...updatedMealDetails, title: 'Oriental Fried Rice' })
      .end((err, res) => {
        expect(res.statusCode).to.equal(409);
        expect(res.body.error).to.equal('Meal already exists');

        if (err) return done(err);
        done();
      });
  });

  invalidID({
    type: 'mealId',
    method: 'put',
    url: '/api/v1/meals/efbbf4ad-c4ae-4134-928d-b5ee305ed5396478',
    token: foodCircleToken,
    data: updatedMealDetails,
  });

  invalidPUT('/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83', foodCircleToken);

  notFound({
    method: 'put',
    url: '/api/v1/meals/efbbf4ad-c4ae-4134-928d-b5ee305ed539',
    token: foodCircleToken,
    data: { ...updatedMealDetails, title: 'Porridge' },
  });

  notAdmin('put', '/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83');

  unAuthorized('put', '/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83');
});
