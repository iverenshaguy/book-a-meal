import sinon from 'sinon';
import moment from 'moment';
import mockDate from 'mockdate';
import { assert } from 'chai';
import ValidationHandler from '../../src/middlewares/ValidationHandler';

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
const currentDay = moment().format('YYYY-MM-DD');

describe('Validation Handler: Orders', () => {
  it('returns error message if shop is closed', () => {
    mockDate.set(new Date(currentDay).getTime() + (60 * 60 * 18 * 1000));

    ValidationHandler.isShopOpen(req, res, next);

    assert(status.calledWith(200));
  });

  it('calls next if shop is open', () => {
    mockDate.set(new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));

    ValidationHandler.isShopOpen(req, res, next);

    assert(next.called);
  });
});
