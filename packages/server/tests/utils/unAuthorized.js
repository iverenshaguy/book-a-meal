import { expect } from 'chai'; // eslint-disable-line
import request from 'supertest'; // eslint-disable-line
import app from '../../src/app';

/**
 * @function unAuthorized
 * @desc Funtion to test authorized routes
 * @param {string} method
 * @param {string} url
 * @returns {function} Returns Mocha Test Function
 */

const unAuthorized = (method, url) => {
  describe('unAuthorized', () => {
    it('should return 401 error for user without token', (done) => {
      request(app)[method](url)
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.statusCode).to.equal(401);
          expect(res.body.error).to.equal('Unauthorized');

          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
};

export default unAuthorized;
