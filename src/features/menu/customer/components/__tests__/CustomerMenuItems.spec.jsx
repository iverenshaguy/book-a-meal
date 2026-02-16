import React from 'react';
import moment from 'moment';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import WrappedCustomerMenuItems, { CustomerMenuItems } from 'src/features/menu/customer/components/CustomerMenuItems';
import { mealsObj, initialState, metadata } from 'src/config/tests/fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  menu: { ...initialState.menu, meals: mealsObj.meals },
});
const { now } = Date;
const currentDay = moment().format('YYYY-MM-DD');

const order = {
  id: null,
  meals: mealsObj.meals,
  deliveryAddress: '3, Ayodele',
  deliveryPhoneNo: '08123456789',
};

describe('MenuItems', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date(currentDay).getTime() + 60 * 60 * 13 * 1000);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render CustomerMenuItems component correctly', () => {
    const { container } = render(
      <CustomerMenuItems
        {...mealsObj}
        order={order}
        isFetching={false}
        metadata={metadata}
        loadMoreMenu={jest.fn()}
        addOrderItem={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
    expect(screen.getAllByText(/Jollof Rice/i).length).toBeGreaterThan(0);
  });

  it('should render Preloader when fetching caterer items', () => {
    const { container } = render(
      <CustomerMenuItems
        order={order}
        {...mealsObj}
        isFetching
        metadata={metadata}
        loadMoreMenu={jest.fn()}
        addOrderItem={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
    expect(document.querySelector('.menu-preloader')).toBeInTheDocument();
  });

  it('should render message when there are no meals', () => {
    const { container } = render(
      <CustomerMenuItems
        order={order}
        meals={[]}
        isFetching={false}
        metadata={metadata}
        loadMoreMenu={jest.fn()}
        addOrderItem={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
    expect(screen.getByText('No Meals Found')).toBeInTheDocument();
  });

  it('should render connected Menu component', () => {
    const { container } = render(
      <Provider store={store}>
        <WrappedCustomerMenuItems
          isFetching={false}
          order={order}
          {...mealsObj}
          metadata={metadata}
          loadMoreMenu={jest.fn()}
          addOrderItem={jest.fn()}
        />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
