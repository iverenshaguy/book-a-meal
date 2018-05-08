import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
// import { currentDay } from '../../utils/data';

describe('Menu Routes: Get the menu specific day', () => {
  it('should get menu for the current day', (done) => {
    request(app)
      .get('/api/v1/menu')
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(err);
        console.log(res.body);
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('No Menu is Available For This Day');
        // expect(res.body).to.include.keys('menuId');
        // expect(res.body).to.include.keys('date');
        // expect(res.body.date).to.equal(currentDay);

        if (err) return done(err);
        done();
      });
  });

  it('should get menu for a specific day', (done) => {
    request(app)
      .get('/api/v1/menu?date=2018-05-06')
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(err);
        console.log(res.body);
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('menuId');
        expect(res.body).to.include.keys('date');
        expect(res.body.date).to.equal('2018-05-06');

        if (err) return done(err);
        done();
      });
  });

  it('should get menu for a specific day that doesn\'t have a menu', (done) => {
    request(app)
      .get('/api/v1/menu?date=2018-04-25')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.message).to.equal('No Menu is Available For This Day');

        if (err) return done(err);
        done();
      });
  });
});
