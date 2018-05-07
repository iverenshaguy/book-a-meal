import sinon from 'sinon';
import { assert } from 'chai';
import Authorization from '../../src/middlewares/Authorization';

// mock server response
const res = {
  send: message => ({ message }),
  status: status => ({
    send: message => ({ status, message })
  })
};

const status = sinon.spy(res, 'status');
const next = sinon.stub();
const userMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';
const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';

describe('Authorization Handler', () => {
  describe('Admin Auth', () => {
    it('sends error 401 for unauthenticated user', () => {
      const unAuthReq = { headers: { authorization: '' } };
      Authorization.authorize(unAuthReq, res, next);

      assert(status.calledWith(401));
    });

    it('sends error 403 for forbidden user ie user that\'s not admin/caterer', () => {
      const forbReq = { headers: { authorization: userMockToken } };
      const authorization = new Authorization('caterer');
      authorization.authorizeRole(forbReq, res, next);

      assert(status.calledWith(403));
    });

    it('calls next for authenticated caterer', () => {
      const authReq = { headers: { authorization: adminMockToken } };
      const authorization = new Authorization('caterer');
      authorization.authorizeRole(authReq, res, next);

      assert(next.called);
    });
  });

  describe('User Auth', () => {
    it('sends error 401 for wrong token', () => {
      const unAuthReq = { headers: { authorization: 'ooefoperopopeieropkldfkldf;okekf;l' } };
      const authorization = new Authorization('user');
      authorization.authorizeRole(unAuthReq, res, next);

      assert(status.calledWith(401));
    });

    it('calls next for authenticated user', () => {
      const authReq = { headers: { authorization: userMockToken } };
      const authorization = new Authorization('user');
      authorization.authorizeRole(authReq, res, next);

      assert(next.called);
    });
  });
});
