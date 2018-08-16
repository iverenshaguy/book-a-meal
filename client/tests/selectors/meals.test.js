import { getLastMealItem } from '../../src/selectors/meals';
import { mealsObj } from '../setup/mockData';

describe('Meals Selectors', () => {
  it('should get the last item', () => {
    const lastItem = getLastMealItem(mealsObj.meals);

    expect(lastItem.id).toEqual('36d525d1-efc9-4b75-9999-3e3d8dc64ce3');
  });
});

