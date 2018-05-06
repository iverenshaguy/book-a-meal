import { expect } from 'chai';
import { helpers } from '../utils/data';
import createMealOrder from '../../src/helpers/createMealOrder';

const { createMealOrderData: { dupArr, arr } } = helpers;

describe('createMealOrder', () => {
  it('creates a meal object for an array of duplicate ids', () => {
    const check = createMealOrder(dupArr);

    expect(check).to.deep.equal([
      { mealId: '72a3417e-45c8-4559-8b74-8b5a61be8614', quantity: 1 },
      { mealId: '8a65538d-f862-420e-bcdc-80743df06578', quantity: 3 },
      { mealId: 'baa0412a-d167-4d2b-b1d8-404cb8f02631', quantity: 2 }
    ]);
  });

  it('creates a meal object for unique mealIds', () => {
    const check = createMealOrder(arr);

    expect(check).to.deep.equal([
      { mealId: '72a3417e-45c8-4559-8b74-8b5a61be8614', quantity: 1 },
      { mealId: '8a65538d-f862-420e-bcdc-80743df06578', quantity: 1 },
      { mealId: 'baa0412a-d167-4d2b-b1d8-404cb8f02631', quantity: 1 }
    ]);
  });
});
