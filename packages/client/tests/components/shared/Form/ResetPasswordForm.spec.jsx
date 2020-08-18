import React from 'react';
import ResetPasswordForm from '../../../../src/components/shared/Form/ResetPasswordForm';
import { formComponentSetup } from '../../../setup/formSetup';

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
