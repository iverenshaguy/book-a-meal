import { expect } from 'chai'; // eslint-disable-line

/**
 * @function notFound
 * @desc Funtion to test forbidden routes
 * @param {string} message
 * @param {object} request
 * @param {string} method
 * @param {string} data
 * @param {string} url
 * @param {string} token
 * @returns {function} Returns Mocha Test Function
 */

const notFound = (message, request, method, data, url, token) => {
  describe('notFound', () => {
    it(message, (done) => {
      request[method](url)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(404);
          expect(res.body.error).to.equal('Not Found');

          if (err) {
            return done(err);
          }
          done();
        });
    });
  });
};

export default notFound;
