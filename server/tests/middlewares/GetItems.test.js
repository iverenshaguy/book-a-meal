import sinon from 'sinon';
import { assert } from 'chai';
import mealsDB from '../../src/dummyData/meals';
import GetItems from '../../src/middlewares/GetItems';

// mock server response
const res = {
  send: message => ({ message }),
  status() {
    return this;
  }
};

// mock server request
const req = {
  headers: 'header',
  query: {
    limit: 5,
    page: 2
  }
};

const send = sinon.spy(res, 'send');


describe('GetItems Handler', () => {
  it('sends an empty arrays', () => {
    GetItems.items(req, res, [], 'meals');

    assert(send.calledWith({ meals: [] }));
  });

  it('sends paginated array of data', () => {
    GetItems.items(req, res, mealsDB, 'meals');

    assert(send.called);
  });
});
