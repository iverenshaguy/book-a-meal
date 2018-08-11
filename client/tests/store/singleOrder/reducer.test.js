import reducer from '../../../src/store/reducers/singleOrder';
import { customerOrder } from '../../setup/mockData';


const state = {
  item: null,
  error: null
};

describe('Orders Reducers', () => {
  it('should return initial State', () => {
    const newState = reducer(undefined, {});

    expect(newState).toEqual(state);
  });

  it('should handle RECEIVE_ORDER_SUCCESS action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_ORDER_SUCCESS',
      payload: customerOrder
    });

    expect(newState).toEqual({
      ...state,
      item: customerOrder
    });
  });

  it('should handle RECEIVE_ORDER_FAILURE action', () => {
    const newState = reducer(state, {
      type: 'RECEIVE_ORDER_FAILURE',
      payload: 'Error',
    });

    expect(newState).toEqual({ ...state, error: 'Error' });
  });
});
