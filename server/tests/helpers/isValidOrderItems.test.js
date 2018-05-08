import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import isValidOrderItems from '../../src/helpers/isValidOrderItems';
import { addOrder } from '../utils/data';

chai.use(chaiAsPromised);
chai.should();
const { validOrder, inValidOrder } = addOrder;

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

  it('returns err when invalid', async () => {
    try {
      await isValidOrderItems(inValidOrder.meals, req);
    } catch (err) {
      expect(err.message).to.equal('Meal 8a65538d-f862-420e-bcdc-80743df06578 is not available');
    }
  });
});
