import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import notAdmin from '../../utils/notAdmin';
import unAuthorized from '../../utils/unAuthorized';
import { tokens } from '../../utils/setup';

const { foodCircleToken } = tokens;

describe('Meal Routes: Get all meals', () => {
  it('should get all meals for authenticated user', (done) => {
    request(app)
      .get('/api/v1/meals')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.meals.length).to.equal(8);

        if (err) return done(err);
        done();
      });
  });

  describe('Bad Query', () => {
    it('should return errors for bad page and limit query', (done) => {
      request(app)
        .get('/api/v1/meals?page=undefined&limit=ghjkl')
        .set('Accept', 'application/json')
        .set('authorization', foodCircleToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.include.keys('errors');
          expect(res.body.errors.limit.msg).to.equal('Limit must be an integer greater than 0');
          expect(res.body.errors.page.msg).to.equal('Page must be an integer greater than 0');

          if (err) return done(err);
          done();
        });
    });

    it('should return errors for null/0 page and limit query', (done) => {
      request(app)
        .get('/api/v1/meals?page=null&limit=0')
        .set('Accept', 'application/json')
        .set('authorization', foodCircleToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.include.keys('errors');
          expect(res.body.errors.limit.msg).to.equal('Limit must be an integer greater than 0');
          expect(res.body.errors.page.msg).to.equal('Page must be an integer greater than 0');

          if (err) return done(err);
          done();
        });
    });

    it('should return errors for empty page and limit query', (done) => {
      request(app)
        .get('/api/v1/meals?page=&limit=')
        .set('Accept', 'application/json')
        .set('authorization', foodCircleToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
          expect(res.body).to.include.keys('errors');
          expect(res.body.errors.limit.msg).to.equal('Limit cannot be blank');
          expect(res.body.errors.page.msg).to.equal('Page cannot be blank');

          if (err) return done(err);
          done();
        });
    });
  });

  notAdmin(
    'should return 403 error for authorized user ie non admin or caterer',
    request(app), 'get', '/api/v1/meals'
  );

  unAuthorized(
    'should return 401 error for user without token',
    request(app), 'get', '/api/v1/meals'
  );
});
