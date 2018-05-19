import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app';

describe('API Home Routes', () => {
  it('should return a Welcome Message for App Home', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Welcome to the Book-A-Meal App');

        if (err) return done(err);
        done();
      });
  });

  it('should return a Welcome Message for API Home', (done) => {
    request(app)
      .get('/api')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Welcome to the Book A Meal API');

        if (err) return done(err);
        done();
      });
  });

  it('should return a Welcome Message for Version 1 API Home', (done) => {
    request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('Welcome to version 1 of the Book A Meal API');

        if (err) return done(err);
        done();
      });
  });

  it('should return a Fallback Message for API Route', (done) => {
    request(app)
      .get('/api/fallback')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Item Not Found');

        if (err) return done(err);
        done();
      });
  });

  it('should return a Fallback Message for Wrong Routes', (done) => {
    request(app)
      .get('/fallback')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Item Not Found');

        if (err) return done(err);
        done();
      });
  });
});
