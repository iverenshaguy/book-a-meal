import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState } from 'src/config/tests/fixtures';
import { render } from '@testing-library/react';
import CustomerSignupForm from 'src/features/common/components/Form/CustomerSignupForm';
import { formComponentSetup } from 'src/features/common/components/Form/utils/tests/formSetup';

describe('CustomerSignupForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);

  const renderWithStore = (ui) => render(<Provider store={store}>{ui}</Provider>);

  it('should render the Customer Signup Form correctly', () => {
    const { handlers, state } = formComponentSetup('customerSignup');
    const { container } = renderWithStore(
      <CustomerSignupForm type="customerSignup" state={state} handlers={handlers} />
    );

    expect(container).toMatchSnapshot();
  });
});
