import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import menuDB from '../../../data/menu.json';
import { addMenu as data, currentDay, adminMockToken } from '../../utils/data';

const { menu1 } = data;

describe('Menu Routes: Get the menu specific day', () => {
  before((done) => {
    request(app)
      .post('/api/v1/menu')
      .set('Accept', 'application/json')
      .set('authorization', adminMockToken)
      .send(menu1)
      .end((err, res) => {
        expect(res.statusCode).to.equal(201);

        if (err) return done(err);
        done();
      });
  });

  after(() => {
    // delete menu for today after test
    const index = menuDB.findIndex(item => item.date === currentDay);

    menuDB.splice(index, 1);
  });

  it('should get menu for the current day', (done) => {
    request(app)
      .get('/api/v1/menu')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('menuId');
        expect(res.body).to.include.keys('date');
        expect(res.body).to.include.keys('created');
        expect(res.body).to.include.keys('updated');
        expect(res.body.date).to.equal(currentDay);

        if (err) return done(err);
        done();
      });
  });

  it('should get menu for a specific day', (done) => {
    request(app)
      .get('/api/v1/menu?date=2018-05-06')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.include.keys('menuId');
        expect(res.body).to.include.keys('date');
        expect(res.body).to.include.keys('created');
        expect(res.body).to.include.keys('updated');
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
