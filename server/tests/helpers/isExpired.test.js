import { expect } from 'chai';
import ordersDB from '../../data/orders.json';
import isExpired from '../../src/helpers/isExpired';

describe('isExpired', () => {
  it('returns true when expired', async () => {
    const check = await isExpired('order', ordersDB, 'ce228787-f939-40a0-bfd3-6607ca8d2e53');

    expect(check).to.equal(true);
  });
});
