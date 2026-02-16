import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState } from 'src/config/tests/fixtures';
import { render } from '@testing-library/react';
import SigninForm from 'src/features/common/components/Form/SigninForm';
import { formComponentSetup } from 'src/features/common/components/Form/utils/tests/formSetup';

describe('SigninForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);

  const renderWithStore = (ui) => render(<Provider store={store}>{ui}</Provider>);

  it('should render SigninForm correctly', () => {
    const { handlers, state } = formComponentSetup('signin');
    const {container} = renderWithStore(<SigninForm type="signin" state={state} handlers={handlers} />);

    expect(container).toMatchSnapshot();
  });
});
