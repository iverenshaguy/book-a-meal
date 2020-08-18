import sinon from 'sinon';
import { assert, expect } from 'chai';
import TrimValues from '../../src/middlewares/TrimValues';

const req = {
  body: {
    one: 'ioperj    ',
    two: '   jii',
    three: false
  }
};

// mock server response
const res = {
  json: message => ({ message }),
  status: status => ({
    json: message => ({ status, message })
  })
};

const next = sinon.spy();

describe('TrimValues', () => {
  it('should return trimmed object', () => {
    TrimValues.trim(req, res, next);

    expect(req.body).to.deep.equal({
      one: 'ioperj',
      two: 'jii',
      three: false
    });
    assert(next.called);
  });
});
