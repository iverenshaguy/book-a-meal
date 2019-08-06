import sinon from 'sinon';
import { assert } from 'chai';
import {
  tokens,
  expiredToken,
  wrongSecretToken
} from '../utils/setup';
import Authorization from '../../src/middlewares/Authorization';

const { emiolaToken, foodCircleToken } = tokens;

// mock server response
const res = {
  json: message => ({ message }),
  status: status => ({
    json: message => ({ status, message })
  })
};

const status = sinon.spy(res, 'status');
const next = sinon.stub();

describe('Authorization Handler', () => {
  describe('Admin Auth', () => {
    it('should send error 401 for unauthenticated user', () => {
      const unAuthReq = { headers: { authorization: '' } };
      Authorization.authorize(unAuthReq, res, next);

      assert(status.calledWith(401));
    });

    it('should send error 403 for forbidden user ie user that\'s not admin', () => {
      const forbReq = { role: 'user', headers: { authorization: emiolaToken } };
      const authorization = new Authorization('caterer');
      authorization.authorizeRole(forbReq, res, next);

      assert(status.calledWith(403));
    });

    it('should call next for authenticated caterer', () => {
      const authReq = { role: 'caterer', headers: { authorization: foodCircleToken } };
      const authorization = new Authorization('caterer');
      authorization.authorizeRole(authReq, res, next);

      assert(next.called);
    });
  });

  describe('User Auth', () => {
    it('should send error 401 for wrong token secret', () => {
      const unAuthReq = { headers: { authorization: wrongSecretToken } };
      Authorization.authorize(unAuthReq, res, next);

      assert(status.calledWith(401));
    });

    it('should send error 401 for expired token', () => {
      const unAuthReq = { headers: { authorization: expiredToken } };
      Authorization.authorize(unAuthReq, res, next);

      assert(status.calledWith(401));
    });

    it('should call next for authenticated user', () => {
      const authReq = { role: 'user', headers: { authorization: emiolaToken } };
      const authorization = new Authorization('user');
      authorization.authorizeRole(authReq, res, next);

      assert(next.called);
    });
  });
});
