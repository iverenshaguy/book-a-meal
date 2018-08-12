import { getLastMealItem } from '../../src/selectors/meals';
import { caterersMealsObj } from '../setup/mockData';

describe('Meals Selectors', () => {
  it('should get the last item', () => {
    const lastItem = getLastMealItem(caterersMealsObj.meals);

    expect(lastItem.id).toEqual('36d525d1-efc9-4b75-9999-3e3d8dc64ce3');
  });
});

