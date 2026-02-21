import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Welcome } from 'src/features/welcome/Welcome';
import { caterer, customer } from 'src/config/tests/fixtures';
import initialState from 'src/features/common/__mocks__/store';

const mockStore = configureStore([thunk]);
const store = mockStore(initialState);

const renderWithStore = (ui) => render(<Provider store={store}>{ui}</Provider>);

const props = {
  user: caterer,
  isAuthenticated: false,
  authenticating: false,
};
const { now } = Date;

describe('Welcome', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render the Preloader component when authenticating', () => {
    const { container } = render(<Welcome {...props} authenticating />);

    expect(container).toMatchSnapshot();
    expect(container.querySelector('[role="progressbar"]')).toBeTruthy();
  });

  it('should render the Welcome component correctly when unauthenticated', () => {
    const { container } = render(<Welcome {...props} />);

    expect(container).toMatchSnapshot();
    expect(screen.getByText(/Delicious Meals/i)).toBeInTheDocument();
  });

  it('should render the Dashboard component correctly when authenticated and the user role is caterer', () => {
    const { container } = renderWithStore(<Welcome {...props} isAuthenticated />);

    expect(container).toMatchSnapshot();
    expect(container).toBeTruthy();
  });

  it('should render the CustomerMenu component correctly when authenticated and the user role is customer', () => {
    const { container } = renderWithStore(<Welcome {...props} user={customer} isAuthenticated />);

    expect(container).toMatchSnapshot();
    expect(container).toBeTruthy();
  });
});
