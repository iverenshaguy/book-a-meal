import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState , customer } from 'src/config/tests/fixtures';
import { View as CustomerView } from 'src/features/common/components/View';

const mockStore = configureStore([thunk]);
const store = mockStore(initialState);

const props = {
  user: customer,
  logout: jest.fn(),
  type: 'menu',
  isFetching: false,
  children: <p>Hi</p>,
  showTime: true,
};

const renderWithStore = (ui) => render(<Provider store={store}>{ui}</Provider>);

describe('CustomerView', () => {
  it('should render CustomerView component correctly', () => {
    const { container } = renderWithStore(<CustomerView {...props} />);

    expect(container).toMatchSnapshot();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.getByText('Hi')).toBeInTheDocument();
  });

  it('should render Preloader when fetching page data', () => {
    const { container } = renderWithStore(<CustomerView {...props} isFetching />);

    expect(container).toMatchSnapshot();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
