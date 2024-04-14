import { getLastMealItem } from 'src/features/meals/data/selectors';
import { mealsObj } from 'src/config/tests/fixtures';

describe('Meals Selectors', () => {
  it('should get the last meal item', () => {
    const lastItem = getLastMealItem(mealsObj.meals);

    expect(lastItem.id).toEqual('36d525d1-efc9-4b75-9999-3e3d8dc64ce3');
  });
});
