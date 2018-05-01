import { expect } from 'chai';
import isArrayOfUUID from '../../src/helpers/isArrayOfUUID';
import { helpers } from '../utils/data';

const {
  checkMealsId: {
    arr1, UUIDArr1
  }
} = helpers;

describe('isArrayOfUUID', () => {
  it('returns true when it is an array of UUIDs', () => {
    const check = isArrayOfUUID(UUIDArr1);

    expect(check).to.equal(true);
  });

  it('returns false when it is not an array of UUIDs', () => {
    expect(() => isArrayOfUUID(arr1)).to.throw(' MealId iieie is invalid, MealId siioe is invalid');
  });
});
