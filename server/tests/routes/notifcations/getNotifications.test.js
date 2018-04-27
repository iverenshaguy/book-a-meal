import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import unAuthorized from '../../utils/unAuthorized';

const userMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';

describe('Order Routes: Get All Notifications', () => {
  describe('Get User Notifications', () => {
    it('should get all notifications that belong to the user', (done) => {
      request(app)
        .get('/api/v1/users/a09a5570-a3b2-4e21-94c3-5cf483dbd1ac/notifications')
        .set('Accept', 'application/json')
        .set('authorization', userMockToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.notifications.length).to.equal(2);
          expect(res.body.notifications[0].orderId).to.equal('87a311b7-898b-4a6b-81c2-619417c96432');
          expect(res.body.notifications[1].orderId).to.equal('d886ce22-9b41-4cf6-9dd6-7bdd5476d6c0');
          expect(res.body.metadata).to.deep.equal({
            pages: [1],
            totalCount: 2,
            itemsPerPage: 2,
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
      request(app), 'get', '/api/v1/users/a09a5570-a3b2-4e21-94c3-5cf483dbd1ac/notifications'
    );
  });
});
