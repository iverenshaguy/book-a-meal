import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import notFound from '../../utils/notFound';
import invalidID from '../../utils/invalidID';
import unAuthorized from '../../utils/unAuthorized';
import { tokens } from '../../utils/setup';

const { foodCircleToken } = tokens;

describe('Meal Routes: Delete a meal option', () => {
  it('should delete a meal for authenticated user', (done) => {
    request(app)
      .delete('/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Meal deleted successfully');

        if (err) return done(err);
        done();
      });
  });

  it('should not get a meal that was originally deleted', (done) => {
    request(app)
      .get('/api/v1/meals')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .end((err, res) => {
        const mealExists = !!(res.body.meals.find(meal => meal.id === '91b6e41c-0972-4ac5-86da-4ac1f5226e83'));

        expect(mealExists).to.equal(false);

        if (err) return done(err);
        done();
      });
  });

  invalidID({
    type: 'mealId',
    method: 'delete',
    url: '/api/v1/meals/efbbf4ad-c4ae-4134-928d-b5ee305ed5396478',
    token: foodCircleToken,
  });

  notFound({
    method: 'delete',
    url: '/api/v1/meals/efbbf4ad-c4ae-4134-928d-b5ee305ed539',
    token: foodCircleToken,
  });

  notAdmin('delete', '/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83');

  unAuthorized('delete', '/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83');
});
