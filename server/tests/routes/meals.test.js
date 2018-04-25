import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app';

// const token = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';

describe('Meals Routes', () => {
  describe('Get all meals', () => {
    it('should get all meals for authenticated user', (done) => {
      request(app)
        .get('/api/v1/meals')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.meals.length).to.equal(5);
          expect(res.body).to.include.keys('metadata');
          expect(res.body.metadata).to.deep.equal({
            pages: [1, 2],
            totalCount: 10,
            itemsPerPage: 5,
            page: 1,
            lastPage: 2,
            firstPage: 1
          });

          if (err) return done(err);
          done();
        });
    });
  });
});
