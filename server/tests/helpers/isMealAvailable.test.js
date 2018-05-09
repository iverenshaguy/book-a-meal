import { expect } from 'chai';
import isMealAvailable from '../../src/helpers/isMealAvailable';

describe('isMealAvailable', () => {
  it('returns true when available', async () => {
    const check = await isMealAvailable('baa0412a-d167-4d2b-b1d8-404cb8f02631');

    expect(check).to.equal(true);
  });

  it('returns false when unavailable', async () => {
    const check = await isMealAvailable('46ced7aa-eed5-4462-b2c0-153f31589bdd');

    expect(check).to.equal(false);
  });
});
