import { expect } from 'chai'; // eslint-disable-line

const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';

/**
 * @function invalidID
 * @desc Funtion to test forbidden routes
 * @param {string} message
 * @param {string} type
 * @param {object} request
 * @param {string} method
 * @param {string} data
 * @param {string} url
 * @returns {function} Returns Mocha Test Function
 */

const invalidID = (message, type, request, method, data, url) => {
  describe('invalidID', () => {
    it(message, (done) => {
      request[method](url)
        .set('Accept', 'application/json')
        .set('authorization', adminMockToken)
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
