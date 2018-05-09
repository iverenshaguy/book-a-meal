import { expect } from 'chai';
import isOrderExpired from '../../src/helpers/isOrderExpired';

describe('isOrderExpired', () => {
  it('returns true when expired', async () => {
    const check = await isOrderExpired('ce228787-f939-40a0-bfd3-6607ca8d2e53');

    expect(check).to.equal(true);
  });
});
