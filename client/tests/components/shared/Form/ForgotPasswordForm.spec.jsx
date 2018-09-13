import React from 'react';
import ForgotPasswordForm from '../../../../src/components/shared/Form/ForgotPasswordForm';
import { formComponentSetup } from '../../../../tests/setup/formSetup';

describe('ForgotPasswordForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the Forgot Password Form correctly', () => {
    const { handlers, state } = formComponentSetup('forgotPassword');
    const wrapper = shallow(<ForgotPasswordForm type="forgotPassword" state={state} handlers={handlers} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
