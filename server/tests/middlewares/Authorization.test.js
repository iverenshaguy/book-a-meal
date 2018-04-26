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
const adminAuth = new Authorization('caterer');
const userAuth = new Authorization('user');


describe('Authorization Handler', () => {
  describe('Admin Auth', () => {
    it('sends error 401 for unauthenticated user', () => {
      const unAuthReq = { headers: { authorization: '' } };
      adminAuth.authorize(unAuthReq, res, next);

      assert(status.calledWith(401));
    });

    it('sends error 403 for forbidden user ie user that\'s not admin/caterer', () => {
      const forbReq = { headers: { authorization: userMockToken } };
      adminAuth.authorize(forbReq, res, next);

      assert(status.calledWith(403));
    });

    it('calls next for authenticated caterer', () => {
      const authReq = { headers: { authorization: adminMockToken } };
      adminAuth.authorize(authReq, res, next);

      assert(next.called);
    });
  });

  describe('User Auth', () => {
    it('sends error 401 for unauthenticated user', () => {
      const unAuthReq = { headers: { authorization: '' } };
      userAuth.authorize(unAuthReq, res, next);

      assert(status.calledWith(401));
    });

    it('sends error 401 for wrong token', () => {
      const unAuthReq = { headers: { authorization: 'ooefoperopopeieropkldfkldf;okekf;l' } };
      userAuth.authorize(unAuthReq, res, next);

      assert(status.calledWith(401));
    });

    it('calls next for authenticated user', () => {
      const authReq = { headers: { authorization: userMockToken } };
      userAuth.authorize(authReq, res, next);

      assert(next.called);
    });
  });
});
