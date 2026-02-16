import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState } from 'src/config/tests/fixtures';
import { render } from '@testing-library/react';
import ForgotPasswordForm from 'src/features/common/components/Form/ForgotPasswordForm';
import { formComponentSetup } from 'src/features/common/components/Form/utils/tests/formSetup';

describe('ForgotPasswordForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);

  const renderWithStore = (ui) => render(<Provider store={store}>{ui}</Provider>);

  it('should render the Forgot Password Form correctly', () => {
    const { handlers, state } = formComponentSetup('forgotPassword');
    const { container } = renderWithStore(
      <ForgotPasswordForm type="forgotPassword" state={state} handlers={handlers} />
    );

    expect(container).toMatchSnapshot();
  });
});
