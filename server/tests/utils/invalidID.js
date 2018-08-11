import { expect } from 'chai'; // eslint-disable-line
import request from 'supertest'; // eslint-disable-line
import app from '../../src/app';

/**
 * @function invalidID
 * @desc Funtion to test forbidden routes
 * @param {object} params
 * @returns {function} Returns Mocha Test Function
 */
const invalidID = ({
  type, method, url, token, data
}) => {
  describe('invalidID', () => {
    it(`should return 400 error for invalid ${type}`, (done) => {
      request(app)[method](url)
        .set('Accept', 'application/json')
        .set('authorization', token)
        .send(data)
        .end((err, res) => {
          expect(res.statusCode).to.equal(400);
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
