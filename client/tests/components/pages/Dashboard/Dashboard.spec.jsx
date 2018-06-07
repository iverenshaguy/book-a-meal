import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Dashboard from '../../../../src/app/pages/Dashboard/Dashboard';
import ConnectedDashboard from '../../../../src/app/pages/Dashboard';
import { caterer, caterersOrdersObj, initialValues } from '../../../setup/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialValues);


describe('Dashboard', () => {
  it('renders correctly when not fetching', () => {
    const { now } = Date;
    Date.now = jest.fn(() => 0); // mock Date now

    try {
      const shallowWrapper = shallow(<Dashboard
        user={caterer}
        logout={jest.fn()}
        fetchOrders={jest.fn()}
        deliverOrder={jest.fn()}
        {...caterersOrdersObj}
        isFetching={false}
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
    } finally {
      Date.now = now; // restore original now method on Date object
    }
  });

  it('renders Preloader when fetching', () => {
    const { now } = Date;
    Date.now = jest.fn(() => 0);

    try {
      const shallowWrapper = shallow(<Dashboard
        user={caterer}
        logout={jest.fn()}
        fetchOrders={jest.fn()}
        deliverOrder={jest.fn()}
        {...caterersOrdersObj}
        isFetching
      />);

      expect(toJson(shallowWrapper)).toMatchSnapshot();
      expect(shallowWrapper.find('Preloader')).toBeTruthy();
    } finally {
      Date.now = now;
    }
  });

  it('renders connected component', () => {
    const { now } = Date;
    Date.now = jest.fn(() => 0);
    const dispatchMock = jest.fn();

    try {
      const comp = (
        <Provider store={store}>
          <ConnectedDashboard
            user={caterer}
            dispatch={dispatchMock}
            {...caterersOrdersObj}
            isFetching={false}
          />
        </Provider>);

      const wrapper = mount(comp);

      expect(toJson(wrapper)).toMatchSnapshot();
      wrapper.unmount();
    } finally {
      Date.now = now;
    }
  });
});
