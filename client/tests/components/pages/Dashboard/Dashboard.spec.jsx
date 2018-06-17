import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Dashboard from '../../../../src/components/pages/Dashboard/Dashboard';
import ConnectedDashboard from '../../../../src/components/pages/Dashboard';
import { caterer, caterersOrdersObj, initialValues } from '../../../setup/data';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialValues);
const { now } = Date;


describe('Dashboard', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly when not fetching', () => {
    const shallowWrapper = shallow(<Dashboard
      user={caterer}
      logout={jest.fn()}
      fetchOrders={jest.fn()}
      deliverOrder={jest.fn()}
      {...caterersOrdersObj}
      isFetching={false}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders Preloader when fetching', () => {
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
  });

  it('renders connected component', () => {
    const dispatchMock = jest.fn();
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
  });
});
