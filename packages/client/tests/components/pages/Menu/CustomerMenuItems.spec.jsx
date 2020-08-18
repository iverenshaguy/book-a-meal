import React from 'react';
import moment from 'moment';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import MenuItemsComponent from '../../../../src/components/pages/Menu/CustomerMenu/MenuItems';
import MenuItemsContainer from '../../../../src/containers/pages/Menu/CustomerMenu/MenuItems';
import { mealsObj, initialState, metadata } from '../../../setup/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState, menu: { ...initialState.menu, meals: mealsObj.meals }
});
const { now } = Date;
const currentDay = moment().format('YYYY-MM-DD');

const order = {
  id: null,
  meals: mealsObj.meals,
  deliveryAddress: '3, Ayodele',
  deliveryPhoneNo: '08123456789'
};

describe('MenuItems', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date(currentDay).getTime() + (60 * 60 * 13 * 1000));
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render MenuItems component correctly', () => {
    const shallowWrapper = shallow(<MenuItemsComponent
      {...mealsObj}
      order={order}
      isFetching={false}
      metadata={metadata}
      loadMoreMenu={jest.fn()}
      addOrderItem={jest.fn()}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('MealCard')).toBeTruthy();
  });

  it('should render Preloader when fetching menu items', () => {
    const shallowWrapper = shallow(<MenuItemsComponent
      order={order}
      {...mealsObj}
      isFetching
      metadata={metadata}
      loadMoreMenu={jest.fn()}
      addOrderItem={jest.fn()}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('should render message when there are no meals on the menu', () => {
    const shallowWrapper = shallow(<MenuItemsComponent
      order={order}
      meals={[]}
      isFetching={false}
      metadata={metadata}
      loadMoreMenu={jest.fn()}
      addOrderItem={jest.fn()}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('p').text()).toEqual('No Meals Found');
  });

  it('should start fetching more menu items when Menu Component triggers loadMoreMenu function', () => {
    const loadMoreMenuMock = jest.fn();

    const wrapper = shallow(<MenuItemsComponent
      order={order}
      {...mealsObj}
      isFetching={false}
      metadata={metadata}
      loadMoreMenu={loadMoreMenuMock}
      addOrderItem={jest.fn()}
    />);

    wrapper.find('CardGroup').props().loadMore();

    expect(loadMoreMenuMock).toHaveBeenCalledTimes(1);
  });

  it('should render connected Menu component', () => {
    const comp = (
      <Provider store={store}>
        <MenuItemsContainer
          isFetching={false}
          order={order}
          {...mealsObj}
          metadata={metadata}
          loadMoreMenu={jest.fn()}
          addOrderItem={jest.fn()}
        />
      </Provider>
    );

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
