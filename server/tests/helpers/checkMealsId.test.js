import { expect } from 'chai';
import checkMealsId from '../../src/helpers/checkMealsId';
import { helpers } from '../utils/data';

const {
  checkMealsId: {
    arr1, arr2, UUIDArr1, UUIDArr2
  }
} = helpers;
const emptyArr = [];
const emptyArrStr = '[]';
const str = 'jkkkll';

describe('checkMealsId', () => {
  it('returns true when item is an array of UUIDs ', () => {
    const check = checkMealsId(UUIDArr1);

    expect(check).to.equal(true);
  });

  it('returns true when item is an array like string of UUIDs ', () => {
    const check = checkMealsId(UUIDArr2);

    expect(check).to.equal(true);
  });

  it('returns error when item is an array of non-UUIDs ', () => {
    expect(() => checkMealsId(arr1)).to.throw('MealId iieie is invalid, MealId siioe is invalid');
  });

  it('returns error when item is an array like string of non-UUIDs ', () => {
    expect(() => checkMealsId(arr2)).to.throw('MealId iieie is invalid, MealId siioe is invalid');
  });

  it('returns error when item is an empty array', () => {
    const check = checkMealsId(emptyArr);

    expect(check).to.equal(false);
  });

  it('returns error when item is an empty string like array', () => {
    const check = checkMealsId(emptyArrStr);

    expect(check).to.equal(false);
  });

  it('returns error when item is a string', () => {
    const check = checkMealsId(str);

    expect(check).to.equal(false);
  });
});
