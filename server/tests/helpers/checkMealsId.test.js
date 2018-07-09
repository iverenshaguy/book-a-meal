import { expect } from 'chai';
import checkMealsId from '../../src/helpers/checkMealsId';
import { helpers } from '../utils/data';

const { checkMealsId: { arr1, UUIDArr1 } } = helpers;

describe('checkMealsId', () => {
  it('returns true when item is an array of UUIDs ', () => {
    const check = checkMealsId(UUIDArr1);

    expect(check).to.equal(true);
  });

  it('returns error when item is an array of non-UUIDs ', () => {
    expect(() => checkMealsId(arr1)).to.throw('MealId iieie is invalid, MealId siioe is invalid');
  });

  it('returns false when item is an empty array', () => {
    const check = checkMealsId([]);

    expect(check).to.equal(false);
  });

  it('returns false when item is a string', () => {
    expect(checkMealsId('str')).to.equal(false);
  });

  it('returns false when item is an object', () => {
    expect(checkMealsId({ siioe: 'siioe' })).to.equal(false);
  });

  it('returns false when item is a number', () => {
    expect(checkMealsId(1)).to.equal(false);
  });

  it('returns false when item is null/undefined', () => {
    expect(checkMealsId()).to.equal(false);
    expect(checkMealsId(null)).to.equal(false);
    expect(checkMealsId(undefined)).to.equal(false);
  });
});
