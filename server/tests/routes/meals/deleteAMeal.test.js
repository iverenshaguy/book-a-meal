import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import notFound from '../../utils/notFound';
import unAuthorized from '../../utils/unAuthorized';

const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';

describe('Meal Routes: Delete a meal option', () => {
  it('should delete a meal for authenticated user', (done) => {
    request(app)
      .delete('/api/v1/meals/oepoepope043934343')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(204);
        expect(res.body).to.be.empty();

        if (err) return done(err);
        done();
      });
  });

  notFound(
    'should return 404 error for invalid meal id',
    request(app), 'delete', undefined, '/api/v1/meals/oepoepope043934342782389'
  );

  notAdmin(
    'should return 403 error for authorized user ie non admin or caterer',
    request(app), 'delete', '/api/v1/meals/oepoepope043934343'
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'delete', '/api/v1/meals/oepoepope043934343'
  );
});
