import React from 'react';
import ForgotPasswordForm from 'src/features/common/components/Form/ForgotPasswordForm';
import { formComponentSetup } from 'src/features/common/components/Form/utils/tests/formSetup';

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
