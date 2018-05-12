import { expect } from 'chai'; // eslint-disable-line
import { tokens } from './setup';

const { emiolaToken } = tokens;

/**
 * @function notAdmin
 * @desc Funtion to test forbidden routes
 * @param {string} message
 * @param {object} request
 * @param {string} method
 * @param {string} url
 * @returns {function} Returns Mocha Test Function
 */

const notAdmin = (message, request, method, url) => {
  describe('notAdmin', () => {
    it(message, (done) => {
      request[method](url)
        .set('Accept', 'application/json')
        .set('authorization', emiolaToken)
        .end((err, res) => {
          expect(res.statusCode).to.equal(403);
          expect(res.body.error).to.equal('You are not authorized to perform this action');

          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
};

export default notAdmin;
