import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState } from 'src/config/tests/fixtures';
import Header from 'src/features/common/components/Header';

const mockStore = configureStore([thunk]);
const store = mockStore(initialState);
const { now } = Date;

const renderWithStore = (ui) => render(<Provider store={store}>{ui}</Provider>);

describe('Header', () => {
  beforeAll(() => {
    Date.now = jest.fn(() => 0);
  });

  afterAll(() => {
    Date.now = now;
  });

  it('should render Header component correctly', () => {
    const { container } = renderWithStore(<Header type="home" />);

    expect(container).toMatchSnapshot();
  });

  it('should render unauthenticated Header component correctly when type prop is unauth', () => {
    const { container } = renderWithStore(<Header type="unauth" />);

    expect(container).toMatchSnapshot();
  });

  it('should render Caterer Header component correctly when type prop is caterer', () => {
    const { container } = renderWithStore(<Header type="caterer" />);

    expect(container).toMatchSnapshot();
  });
});
