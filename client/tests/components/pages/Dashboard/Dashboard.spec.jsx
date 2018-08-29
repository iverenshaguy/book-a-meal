import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Dashboard from '../../../../src/components/pages/Dashboard';
import ConnectedDashboard from '../../../../src/containers/pages/Dashboard';
import { caterer, caterersOrdersObj, initialState } from '../../../setup/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  ...initialState,
  auth: { ...initialState.auth, user: { ...initialState.auth.user, ...caterer } }
});
const { now } = Date;


describe('Dashboard', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('renders correctly', () => {
    const shallowWrapper = shallow(<Dashboard
      fetchOrders={jest.fn()}
      deliverOrder={jest.fn()}
      {...caterersOrdersObj}
    />);

    expect(toJson(shallowWrapper)).toMatchSnapshot();
  });

  it('renders connected component correctly', () => {
    const dispatchMock = jest.fn();
    const comp = (
      <Provider store={store}>
        <ConnectedDashboard
          dispatch={dispatchMock}
          {...caterersOrdersObj}
        />
      </Provider>);

    const wrapper = mount(comp, rrcMock.get());

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
