import { getOrderItem } from '../../src/selectors/orders';
import { caterersOrdersObj } from '../setup/mockData';

describe('Orders Selectors', () => {
  it('should get the last item', () => {
    const orderItem = getOrderItem('fb097bde-5959-45ff-8e21-51184fa60c25', caterersOrdersObj.orders);

    expect(orderItem).toEqual(caterersOrdersObj.orders[0]);
  });
});

