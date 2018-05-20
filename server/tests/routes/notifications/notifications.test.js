import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import { tokens } from '../../utils/setup';

const { foodCircleToken, emiolaToken } = tokens;

describe('Notifications: Get Notifications', () => {
  it(' should get all caterer\'s notifications', (done) => {
    request(app)
      .get('/api/v1/notifications')
      .set('Accept', 'application/json')
      .set('authorization', foodCircleToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.notifications.length).to.equal(2);

        if (err) return done(err);
        done();
      });
  });

  it(' should get all customers\'s notifications', (done) => {
    request(app)
      .get('/api/v1/notifications')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.notifications.length).to.equal(5);

        if (err) return done(err);
        done();
      });
  });
});
