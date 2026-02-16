import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState } from 'src/config/tests/fixtures';
import MenuModal from 'src/features/common/components/Modal/MenuModal';

const mockStore = configureStore([thunk]);
const store = mockStore(initialState);

describe('MenuModal', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render MenuModal component correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <MenuModal />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });
});
