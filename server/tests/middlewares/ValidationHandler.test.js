import sinon from 'sinon';
import moment from 'moment';
import { assert } from 'chai';
import ValidationHandler from '../../src/middlewares/ValidationHandler';

const currentHour = moment().hour();
const currentMin = moment().minute();

// mock server response
const res = {
  status: status => ({
    json: message => ({ status, message })
  })
};

// mock server request
const req = {
  headers: 'header'
};

const next = sinon.spy();
const status = sinon.spy(res, 'status');

describe('Validation Handler: Orders', () => {
  let env;

  // mocking an environment
  before(() => {
    env = process.env; // eslint-disable-line
  });

  after(() => {
    process.env = env;
  });

  it('returns error message if shop is closed', () => {
    process.env.OPENING_HOUR = currentHour + 1;
    process.env.OPENING_MINUTE = currentMin;
    process.env.CLOSING_HOUR = currentHour + 2;
    process.env.CLOSING_MINUTE = 0;

    ValidationHandler.isShopOpen(req, res, next);

    assert(status.calledWith(200));
  });

  it('calls next if shop is open', () => {
    process.env.OPENING_HOUR = 0;
    process.env.OPENING_MINUTE = currentMin;
    process.env.CLOSING_HOUR = currentHour + 1;
    process.env.CLOSING_MINUTE = 0;

    ValidationHandler.isShopOpen(req, res, next);

    assert(next.called);
  });
});
