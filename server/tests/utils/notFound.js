import { expect } from 'chai'; // eslint-disable-line

const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';

/**
 * @function notFound
 * @desc Funtion to test forbidden routes
 * @param {string} message
 * @param {object} request
 * @param {string} method
 * @param {string} data
 * @param {string} url
 * @returns {function} Returns Mocha Test Function
 */

const notFound = (message, request, method, data, url) => {
  describe('notFound', () => {
    it(message, (done) => {
      request[method](url)
        .set('Accept', 'application/json')
        .set('authorization', adminMockToken)
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
