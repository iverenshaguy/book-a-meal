import React from 'react';
import CustomerSignupForm from '../../../../src/app/shared/Form/CustomerSignupForm';
import { formComponentSetup } from '../../../../tests/setup/formSetup';

describe('CustomerSignupForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { handlers, state } = formComponentSetup('customerSignup');
    const wrapper = shallow(<CustomerSignupForm type="customerSignup" state={state} handlers={handlers} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
