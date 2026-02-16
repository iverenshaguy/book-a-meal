import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState } from 'src/config/tests/fixtures';
import { render } from '@testing-library/react';
import ResetPasswordForm from 'src/features/common/components/Form/ResetPasswordForm';
import { formComponentSetup } from 'src/features/common/components/Form/utils/tests/formSetup';

const token = 'fdghjklfghjklfghjklfdghjkl';

describe('ResetPasswordForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);

  const renderWithStore = (ui) => render(<Provider store={store}>{ui}</Provider>);

  it('should render the Reset Password Form correctly', () => {
    const { handlers, state } = formComponentSetup('resetPassword');
    const { container } = renderWithStore(
      <ResetPasswordForm type="resetPassword" token={token} state={state} handlers={handlers} />
    );

    expect(container).toMatchSnapshot();
  });
});
