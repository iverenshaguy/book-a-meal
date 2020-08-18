import { expect } from 'chai';
import checkOrderMeals from '../../src/helpers/checkOrderMeals';

describe('checkOrderMeals', () => {
  it('should return true when item is an array of meal object', () => {
    const check = checkOrderMeals([{ mealId: 'fb097bde-5959-45ff-8e21-51184fa60c25', quantity: 2 }]);

    expect(check).to.equal(true);
  });

  it('should throw error when item is an array of strings', () => {
    expect(() => checkOrderMeals(['fb097bde-5959-45ff-8e21-51184fa60c25']))
      .to.throw('Item 1 must be an object of mealId and quantity');
  });

  it('should throw error when array item doesn\'t have quantity', () => {
    expect(() => checkOrderMeals([{ mealId: 'fb097bde-5959-45ff-8e21-51184fa60c25' }]))
      .to.throw('Item 1 must include both the mealId and meal quantity');
  });

  it('should throw error when array item doesn\'t have mealId', () => {
    expect(() => checkOrderMeals([{ quantity: 2 }]))
      .to.throw('Item 1 must include both the mealId and meal quantity');
  });
});
