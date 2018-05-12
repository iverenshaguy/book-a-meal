import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import { addMenu as data, twoDaysTime, currentDay } from '../../utils/data';
import { tokens } from '../../utils/setup';

const { foodCircleToken, emiolaToken } = tokens;
const { menu1 } = data;

describe('Menu Routes: Get the menu specific day', () => {
  before((done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .send({ ...menu1, date: twoDaysTime })
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);

        if (err) return done(err);
        done();
      });
  });

  it('should get menu for the current day for user', (done) => {
    request(app)
      .get('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('menu');
        expect(res.body.menu[0]).to.include.keys('date');
        expect(res.body.menu[0].date).to.equal(currentDay);

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
        expect(res.body).to.include.keys('menuId');
        expect(res.body).to.include.keys('date');
        expect(res.body.date).to.equal(currentDay);

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
        expect(res.body).to.include.keys('menuId');
        expect(res.body).to.include.keys('date');
        expect(res.body.date).to.equal(twoDaysTime);

        if (err) return done(err);
        done();
      });
  });
});
