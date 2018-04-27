import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import unAuthorized from '../../utils/unAuthorized';

const userMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';

describe('Notification Routes: Get All Notifications', () => {
  describe('Get User Notifications', () => {
    it('should get all notifications that belong to the user', (done) => {
      request(app)
        .get('/api/v1/notifications')
        .set('Accept', 'application/json')
        .set('authorization', userMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.notifications.length).to.equal(3);
          expect(res.body.metadata).to.deep.equal({
            pages: [1],
            totalCount: 3,
            itemsPerPage: 3,
            page: 1,
            lastPage: 1,
            firstPage: 1
          });

          if (err) return done(err);
          done();
        });
    });

    unAuthorized(
      'should return 401 error for user without token',
      request(app), 'get', '/api/v1/notifications'
    );
  });
});
