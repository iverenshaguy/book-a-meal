import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { initialState } from 'src/config/tests/fixtures';
import { render } from '@testing-library/react';
import CatererSignupForm from 'src/features/common/components/Form/CatererSignupForm';
import { formComponentSetup } from 'src/features/common/components/Form/utils/tests/formSetup';

describe('CatererSignupForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  const mockStore = configureStore([thunk]);
  const store = mockStore(initialState);

  const renderWithStore = (ui) => render(<Provider store={store}>{ui}</Provider>);

  it('should render the Caterer Signup Form correctly', () => {
    const { handlers, state } = formComponentSetup('catererSignup');
    const { container } = renderWithStore(
      <CatererSignupForm type="catererSignup" state={state} handlers={handlers} />
    );

    expect(container).toMatchSnapshot();
  });
});
