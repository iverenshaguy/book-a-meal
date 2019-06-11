import { expect } from 'chai';
import checkMealsId from '../../src/helpers/checkMealsId';
import { helpers as mockData } from '../utils/mockData';

const { checkMealsId: { arrayOfWrongIds, arrayOfUuids } } = mockData;

describe('checkMealsId', () => {
  it('should return true when item is an array of UUIDs ', () => {
    const check = checkMealsId(arrayOfUuids);

    expect(check).to.equal(true);
  });

  it('should return error when item is an array of non-UUIDs ', () => {
    expect(() => checkMealsId(arrayOfWrongIds)).to.throw('MealId iieie is invalid, MealId siioe is invalid');
  });

  it('should return false when item is an empty array', () => {
    const check = checkMealsId([]);

    expect(check).to.equal(false);
  });

  it('should return false when item is a string', () => {
    expect(checkMealsId('str')).to.equal(false);
  });

  it('should return false when item is an object', () => {
    expect(checkMealsId({ siioe: 'siioe' })).to.equal(false);
  });

  it('should return false when item is a number', () => {
    expect(checkMealsId(1)).to.equal(false);
  });

  it('should return false when item is null/undefined', () => {
    expect(checkMealsId()).to.equal(false);
    expect(checkMealsId(null)).to.equal(false);
    expect(checkMealsId(undefined)).to.equal(false);
  });
});
