import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app';

describe('API Home Routes', () => {
  describe('Serve Client File', () => {
    it('should serve client file', (done) => {
      request(app)
        .get('/')
        .expect('Content-Type', /html/)
        .end((err, res) => {
          expect(res.text).to.contain('<div id="app"></div>');

          if (err) return done(err);
          done();
        });
    });

    it('should return a fallback page for wrong routes', (done) => {
      request(app)
        .get('/yadayada')
        .expect('Content-Type', /html/)
        .end((err, res) => {
          expect(res.text).to.contain('<div id="app"></div>');

          if (err) return done(err);
          done();
        });
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

  it('should return a Fallback Page for wrong API route', (done) => {
    request(app)
      .get('/api/fallback')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.error).to.equal('Item Not Found');

        if (err) return done(err);
        done();
      });
  });
});
