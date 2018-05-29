import request from 'supertest';
import { expect } from 'chai';
import app from '../../../src/app';
import { tokens } from '../../utils/setup';

const { emiolaToken } = tokens;

describe('Refresh Token', () => {
  it('should refresh user token based on token input', (done) => {
    request.agent(app)
      .get('/api/v1/users/token')
      .set('Accept', 'application/json')
      .set('authorization', emiolaToken)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.user.firstname).to.equal('Emiola');
        expect(res.body).to.haveOwnProperty('token');

        if (err) {
          return done(err);
        }
        done();
      });
  });
});
