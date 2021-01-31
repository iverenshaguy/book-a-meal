import React from 'react';
import SigninForm from '../../../../src/components/shared/Form/SigninForm';
import { formComponentSetup } from '../../../setup/formSetup';

describe('SigninForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render SigninForm correctly', () => {
    const { handlers, state } = formComponentSetup('signin');
    const wrapper = shallow(<SigninForm type="signin" state={state} handlers={handlers} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
