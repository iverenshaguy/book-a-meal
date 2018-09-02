import getOrderFromLocalStorage from '../../src/helpers/getOrderFromLocalStorage';
import { customer, localStorageOrder } from '../setup/mockData';

const { now } = Date;

describe('Get Order From Local Storage', () => {
  beforeAll(() => {
    localStorage.setItem('bookamealorder', JSON.stringify(localStorageOrder));
  });

  it('should return an array of order items', () => {
    const order = getOrderFromLocalStorage(customer);

    expect(order.meals.length).toEqual(2);
    expect(order.meals[0].id).toEqual('36d525d1-efc9-4b75-9999-3e3d8dc64ce3');
  });

  it('should return an empty array when user is not the user stored', () => {
    const order = getOrderFromLocalStorage({ ...customer, id: '5678904546789' });

    expect(order.meals.length).toEqual(0);
  });

  it('should return an empty array when the stored item is not today\'s date', () => {
    Date.now = jest.fn(() => 0);
    const order = getOrderFromLocalStorage(customer);

    expect(order.meals.length).toEqual(0);
    Date.now = now;
  });

  it('should return an empty array when there is no item in local storage', () => {
    localStorage.removeItem('bookamealorder');
    const order = getOrderFromLocalStorage(customer);

    expect(order.meals.length).toEqual(0);
  });
});
