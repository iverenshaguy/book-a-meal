import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import db from '../../../src/models';
import { menu as mockData, twoDaysTime, currentDay } from '../../utils/mockData';
import { tokens } from '../../utils/setup';

const { foodCircleToken, emiolaToken } = tokens;
const { menuDetailsWithoutDate } = mockData;

describe('Menu Routes: Get the menu specific day', () => {
  before((done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ ...menuDetailsWithoutDate, date: twoDaysTime })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);

        if (err) return done(err);
        done();
      });
  });

  it('should get menu for the current day for customer', (done) => {
    request(app)
      .get('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('menu');

        if (err) return done(err);
        done();
      });
  });

  it('should get menu for the current day for caterer', (done) => {
    request(app)
      .get('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('metadata');
        expect(res.body.menu).to.include.keys('id');
        expect(res.body.menu).to.include.keys('date');
        expect(res.body.menu.date).to.equal(currentDay);

        if (err) return done(err);
        done();
      });
  });

  it('should append date to query when getting next meals url for caterer when query contains date', (done) => {
    request(app)
      .get('/api/v1/menu?date=2018-03-09&limit=2')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('metadata');
        expect(res.body.metadata.next).to.equal('/menu?date=2018-03-09&page=2&limit=2');

        if (err) return done(err);
        done();
      });
  });

  it('should not append date to query when getting next meals url for caterer when query does not contains date', (done) => {
    request(app)
      .get('/api/v1/menu?limit=2')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('metadata');
        expect(res.body.metadata.next).to.equal('/menu?page=2&limit=2');

        if (err) return done(err);
        done();
      });
  });

  it('should get menu for a specific day for caterer', (done) => {
    request(app)
      .get(`/api/v1/menu?date=${twoDaysTime}`)
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('metadata');
        expect(res.body.menu).to.include.keys('id');
        expect(res.body.menu).to.include.keys('date');
        expect(res.body.menu.date).to.equal(twoDaysTime);

        if (err) return done(err);
        done();
      });
  });

  describe('No Menu', () => {
    before((done) => {
      db.Menu.destroy({ truncate: { cascade: true } }).then(() => done());
    });

    it('User: should return empty meals array when there is no menu', (done) => {
      request(app)
        .get('/api/v1/menu')
        .set('Accept', 'application/json')
        .set('authorization', emiolaToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.menu.meals.length).to.equal(0);

          if (err) return done(err);
          done();
        });
    });

    it('Caterer: should return empty meals when there is no menu', (done) => {
      request(app)
        .get('/api/v1/menu')
        .set('Accept', 'application/json')
        .set('authorization', foodCircleToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.menu.meals.length).to.equal(0);

          if (err) return done(err);
          done();
        });
    });
  });

  describe('Bad Query', () => {
    it('should return errors for bad page and limit query', (done) => {
      request(app)
        .get('/api/v1/menu?date=2018-08-02&page=undefined&limit=ghjkl')
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
        .get('/api/v1/menu?date=2018-08-02&page=null&limit=0')
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
        .get('/api/v1/menu?date=2018-08-02&page=&limit=')
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
});
