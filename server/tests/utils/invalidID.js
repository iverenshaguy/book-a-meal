import { expect } from 'chai'; // eslint-disable-line

/**
 * @function invalidID
 * @desc Funtion to test forbidden routes
 * @param {string} message
 * @param {string} type
 * @param {object} request
 * @param {string} method
 * @param {string} data
 * @param {string} url
 * @param {string} token
 * @returns {function} Returns Mocha Test Function
 */

const invalidID = (message, type, request, method, data, url, token) => {
  describe('invalidID', () => {
    it(message, (done) => {
      request[method](url)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body.errors[type].msg).to.equal('Invalid ID');

          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
};

export default invalidID;
