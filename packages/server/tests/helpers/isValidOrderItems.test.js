import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import isValidOrderItems from '../../src/helpers/isValidOrderItems';
import { order as mockData } from '../utils/mockData';

chai.use(chaiAsPromised);
chai.should();

const { validOrderDetails, inValidOrderDetails } = mockData;

describe('isValidOrderItems', () => {
  it('should return true when order items are valid', async () => {
    const check = await isValidOrderItems(validOrderDetails.meals);

    expect(check).to.equal(true);
  });

  it('should return err when order items are invalid', async () => {
    try {
      await isValidOrderItems(inValidOrderDetails.meals);
    } catch (err) {
      expect(err.message).to.equal('Meal 8a65538d-f862-420e-bcdc-80743df06578 is not available');
    }
  });
});
