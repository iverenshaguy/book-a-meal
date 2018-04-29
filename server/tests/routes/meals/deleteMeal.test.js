import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import notFound from '../../utils/notFound';
import invalidID from '../../utils/invalidID';
import unAuthorized from '../../utils/unAuthorized';

const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';

describe('Meal Routes: Delete a meal option', () => {
  it('should delete a meal for authenticated user', (done) => {
    request(app)
      .delete('/api/v1/meals/91b6e41c-0972-4ac5-86da-4ac1f5226e83')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(204);
        expect(res.body).to.deep.equal({});

        if (err) return done(err);
        done();
      });
  });

  invalidID(
    'should return 422 error for invalid meal id', 'mealId',
    request(app), 'delete', undefined, '/api/v1/meals/efbbf4ad-c4ae-4134-928d-b5ee305ed5396478'
  );

  notFound(
    'should return 404 error for non-existent meal id',
    request(app), 'delete', undefined, '/api/v1/meals/efbbf4ad-c4ae-4134-928d-b5ee305ed539'
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
