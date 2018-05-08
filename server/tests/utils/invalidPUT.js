import { expect } from 'chai'; // eslint-disable-line

/**
 * @function invalidPUT
 * @desc Funtion to test for empty PUT requests
 * @param {string} message
 * @param {object} request
 * @param {string} url
 * @param {string} token
 * @returns {function} Returns Mocha Test Function
 */

const invalidPUT = (message, request, url, token) => {
  describe('invalidPUT', () => {
    it(message, (done) => {
      request
        .put(url)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send({})
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.error).to.equal('Empty PUT Requests Are Not Allowed');

          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
};

export default invalidPUT;
