import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CustomerMenu from '../../../../src/components/pages/Menu/CustomerMenu/CustomerMenu';
import ConnectedCustomerMenu from '../../../../src/components/pages/Menu/CustomerMenu';
import { customer, caterersMealsObj, initialValues } from '../../../setup/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialValues, menu: { ...initialValues.menu, meals: caterersMealsObj.meals }
});

describe('Menu', () => {
  it('renders correctly when not fetching', () => {
    const shallowWrapper = shallow(<CustomerMenu
      user={customer}
      logout={jest.fn()}
      fetchMenu={jest.fn()}
      {...caterersMealsObj}
      isFetching={false}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('MealCard')).toBeTruthy();
  });

  it('renders Preloader when fetching', () => {
    const shallowWrapper = shallow(<CustomerMenu
      user={customer}
      logout={jest.fn()}
      fetchMenu={jest.fn()}
      {...caterersMealsObj}
      isFetching
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('Preloader')).toBeTruthy();
  });

  it('renders message when not fetching and there are no meals on the menu', () => {
    const shallowWrapper = shallow(<CustomerMenu
      user={customer}
      logout={jest.fn()}
      fetchMenu={jest.fn()}
      meals={[]}
      isFetching
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
    expect(shallowWrapper.find('p').text()).toEqual('There are no Meals on Today\'s Menu');
  });

  it('renders connected component', () => {
    const comp = (
      <Provider store={store}>
        <ConnectedCustomerMenu
          user={customer}
          {...caterersMealsObj}
        />
      </Provider>);

    const wrapper = mount(comp);

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
