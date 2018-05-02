import { expect } from 'chai';
import isValidOrderItems from '../../src/helpers/isValidOrderItems';
import { addOrder, helpers } from '../utils/data';

const { newOrder } = addOrder;

const { orderItems: { badMeal } } = helpers;

const req = {
  body: {
    date: '2018-05-06'
  }
};

describe('isValidOrderItems', () => {
  it('returns true when not empty', () => {
    const check = isValidOrderItems(newOrder.meals, req);

    expect(check).to.equal(true);
  });

  it('throws an error when value is empty', () => {
    const err = 'Meal 81211c24-51c0-46ec-b1e0-18db55kdfkod880958 is not available,Meal  is not available';
    expect(() => isValidOrderItems(badMeal.meals, req)).to.throw(err);
  });
});
