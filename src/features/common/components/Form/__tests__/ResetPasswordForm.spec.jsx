import React from 'react';
import ResetPasswordForm from 'src/features/common/components/Form/ResetPasswordForm';
import { formComponentSetup } from 'src/features/common/components/Form/utils/tests/formSetup';

const token = 'fdghjklfghjklfghjklfdghjkl';

describe('ResetPasswordForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the Reset Password Form correctly', () => {
    const { handlers, state } = formComponentSetup('resetPassword');
    const wrapper = shallow(<ResetPasswordForm type="resetPassword" token={token} state={state} handlers={handlers} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
