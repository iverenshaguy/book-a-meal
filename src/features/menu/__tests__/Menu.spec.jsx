import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import Menu from 'src/features/menu/Menu';
import { caterer, customer, initialState } from 'src/config/tests/fixtures';

const mockStore = configureStore([thunk]);
const store = mockStore(initialState);

const { now } = Date;

describe('Menu', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => new Date().setMilliseconds(0));
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render Caterer Menu component correctly when type prop is caterer', () => {
    const { container } = render(
      <Provider store={store}>
        <Menu type="caterer" user={caterer} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });

  it('should render Customer Menu component correctly when type prop is customer', () => {
    const { container } = render(
      <Provider store={store}>
        <Menu type="customer" user={customer} />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
