import React from 'react';
import CustomerSignupForm from '../../../../src/components/shared/Form/CustomerSignupForm';
import { formComponentSetup } from '../../../setup/formSetup';

describe('CustomerSignupForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the Customer Signup Form correctly', () => {
    const { handlers, state } = formComponentSetup('customerSignup');
    const wrapper = shallow(<CustomerSignupForm type="customerSignup" state={state} handlers={handlers} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
