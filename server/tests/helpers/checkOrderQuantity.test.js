import { expect } from 'chai';
import checkOrderQuantity from '../../src/helpers/checkOrderQuantity';

describe('checkOrderQuantity', () => {
  it('returns true when item is an integer greater than 0', () => {
    const check = checkOrderQuantity([{ mealId: 'fb097bde-5959-45ff-8e21-51184fa60c25', quantity: 2 }]);

    expect(check).to.equal(true);
  });

  it('throws error when item is not an integer', () => {
    expect(() => checkOrderQuantity([{ mealId: 'fb097bde-5959-45ff-8e21-51184fa60c25', quantity: 'one' }]))
      .to.throw('Quantity for meal fb097bde-5959-45ff-8e21-51184fa60c25 must be an integer');
  });

  it('throws error when item is a negative integer', () => {
    expect(() => checkOrderQuantity([{ mealId: 'fb097bde-5959-45ff-8e21-51184fa60c25', quantity: -1 }]))
      .to.throw('Quantity for meal fb097bde-5959-45ff-8e21-51184fa60c25 must be greater than 0');
  });

  it('throws error when item is 0', () => {
    expect(() => checkOrderQuantity([{ mealId: 'fb097bde-5959-45ff-8e21-51184fa60c25', quantity: 0 }]))
      .to.throw('Quantity for meal fb097bde-5959-45ff-8e21-51184fa60c25 must be greater than 0');
  });
});
