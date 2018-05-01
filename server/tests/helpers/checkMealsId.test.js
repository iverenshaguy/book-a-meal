import { expect } from 'chai';
import checkMealsId from '../../src/helpers/checkMealsId';

const arr1 = ['iieie', 'siioe'];
const arr2 = "['iieie', 'siioe']";
const UUIDArr1 = [
  '72a3417e-45c8-4559-8b74-8b5a61be8614',
  '8a65538d-f862-420e-bcdc-80743df06578',
  'f9eb7652-125a-4bcb-ad81-02f84901cdc3'
];
const UUIDArr2 = `[
'72a3417e-45c8-4559-8b74-8b5a61be8614',
'8a65538d-f862-420e-bcdc-80743df06578',
'f9eb7652-125a-4bcb-ad81-02f84901cdc3'
]`;
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

  it('returns false when item is an array of non-UUIDs ', () => {
    expect(() => checkMealsId(arr1)).to.throw('MealId iieie is invalid, MealId siioe is invalid');
  });

  it('returns false when item is an array like string of non-UUIDs ', () => {
    expect(() => checkMealsId(arr2)).to.throw('MealId iieie is invalid, MealId siioe is invalid');
  });

  it('returns false when item is an empty array', () => {
    const check = checkMealsId(emptyArr);

    expect(check).to.equal(false);
  });

  it('returns false when item is an empty string like array', () => {
    const check = checkMealsId(emptyArrStr);

    expect(check).to.equal(false);
  });

  it('returns false when item is a string', () => {
    const check = checkMealsId(str);

    expect(check).to.equal(false);
  });
});
