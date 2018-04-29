import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import unAuthorized from '../../utils/unAuthorized';

const userMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';
const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';

describe('Notification Routes: Get All Notifications', () => {
  describe('Get User Notifications', () => {
    it('should get all notifications that belong to the user', (done) => {
      request(app)
        .get('/api/v1/notifications')
        .set('Accept', 'application/json')
        .set('authorization', userMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.notifications.length).not.to.equal(0);

          if (err) return done(err);
          done();
        });
    });

    unAuthorized(
      'should return 401 error for user without token',
      request(app), 'get', '/api/v1/notifications'
    );
  });

  describe('Get Caterer Notifications', () => {
    it('should get all notifications that belong to the caterer', (done) => {
      request(app)
        .get('/api/v1/notifications')
        .set('Accept', 'application/json')
        .set('authorization', adminMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.notifications.length).not.to.equal(0);

          if (err) return done(err);
          done();
        });
    });
  });
});
