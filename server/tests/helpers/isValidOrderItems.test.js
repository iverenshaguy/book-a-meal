import { expect } from 'chai';
import isValidOrderItems from '../../src/helpers/isValidOrderItems';
import { addOrder } from '../utils/data';

const { validOrder } = addOrder;

const req = {
  body: {
    date: '2018-03-09'
  }
};

describe('isValidOrderItems', () => {
  it('returns true when valid', async () => {
    const check = await isValidOrderItems(validOrder.meals, req);

    expect(check).to.equal(true);
  });
});
