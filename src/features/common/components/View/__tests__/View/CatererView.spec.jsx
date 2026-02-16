import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState , caterer } from 'src/config/tests/fixtures';
import { View as CatererView } from 'src/features/common/components/View';

const mockStore = configureStore([thunk]);
const store = mockStore(initialState);

const props = {
  user: caterer,
  logout: jest.fn(),
  type: 'dashboard',
  isFetching: false,
  children: <p>Hi</p>,
  showTime: true,
};
const { now } = Date;

const renderWithStore = (ui) => render(<Provider store={store}>{ui}</Provider>);

describe('CatererView', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render CatererView component correctly', () => {
    const { container } = renderWithStore(<CatererView {...props} />);

    expect(container).toMatchSnapshot();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.getByText('Hi')).toBeInTheDocument();
  });

  it('should render Preloader when fetching page data', () => {
    const { container } = renderWithStore(<CatererView {...props} isFetching />);

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
