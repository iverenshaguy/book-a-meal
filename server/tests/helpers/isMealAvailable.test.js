import { expect } from 'chai';
import isMealAvailable from '../../src/helpers/isMealAvailable';

describe('isMealAvailable', () => {
  it('should return true when meal is available on menu for that day', async () => {
    const check = await isMealAvailable('baa0412a-d167-4d2b-b1d8-404cb8f02631');

    expect(check).to.equal(true);
  });

  it('should return false when meal is not available on menu for a particular day', async () => {
    const check = await isMealAvailable('baa0412a-d167-4d2b-b1d8-404cb8f02631', '2019-02-03');

    expect(check).to.equal(false);
  });

  it('should return false when meal is unavailable on menu for that day', async () => {
    const check = await isMealAvailable('46ced7aa-eed5-4462-b2c0-153f31589bdd');

    expect(check).to.equal(false);
  });
});
