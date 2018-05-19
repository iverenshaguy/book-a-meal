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

  invalidID(
    'should return 400 error for invalid meal id', 'mealId',
    request(app), 'delete', undefined, '/api/v1/meals/efbbf4ad-c4ae-4134-928d-b5ee305ed5396478', foodCircleToken
  );

  notFound(
    'should return 404 error for non-existent meal id',
    request(app), 'delete', undefined, '/api/v1/meals/efbbf4ad-c4ae-4134-928d-b5ee305ed539', foodCircleToken
  );

  notAdmin(
    'should return 403 error for authorized user ie non admin or caterer',
    request(app), 'delete', '/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83'
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'delete', '/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83'
  );
});
