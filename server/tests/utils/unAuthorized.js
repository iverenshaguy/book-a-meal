import { expect } from 'chai'; // eslint-disable-line

/**
 * @function unAuthorized
 * @desc Funtion to test authorized routes
 * @param {string} message
 * @param {object} request
 * @param {string} method
 * @param {string} url
 * @returns {function} Returns Mocha Test Function
 */

const unAuthorized = (message, request, method, url) => {
  describe('Unauthorized', () => {
    it(message, (done) => {
      request[method](url)
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
