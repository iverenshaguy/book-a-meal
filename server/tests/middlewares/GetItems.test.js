import sinon from 'sinon';
import { assert } from 'chai';
import mealsDB from '../../data/meals.json';
import GetItems from '../../src/middlewares/GetItems';

// mock server response
const res = {
  json: message => ({ message }),
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

const json = sinon.spy(res, 'json');


describe('GetItems Handler', () => {
  it('sends an empty arrays', () => {
    GetItems.items(req, res, [], 'meals');

    assert(json.calledWith({ meals: [] }));
  });

  it('sends paginated array of data', () => {
    GetItems.items(req, res, mealsDB, 'meals');

    assert(json.called);
  });
});
