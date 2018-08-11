import { expect } from 'chai';
import isArrayOfUUID from '../../src/helpers/isArrayOfUUID';
import { helpers as mockData } from '../utils/mockData';

const { checkMealsId: { arrayOfWrongIds, arrayOfUuids } } = mockData;

describe('isArrayOfUUID', () => {
  it('returns true when it is an array of UUIDs', () => {
    const check = isArrayOfUUID(arrayOfUuids);

    expect(check).to.equal(true);
  });

  it('returns false when it is not an array of UUIDs', () => {
    expect(() => isArrayOfUUID(arrayOfWrongIds)).to.throw(' MealId iieie is invalid, MealId siioe is invalid');
  });
});
