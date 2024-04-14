import React from 'react';
import SigninForm from 'src/features/common/components/Form/SigninForm';
import { formComponentSetup } from 'src/features/common/components/Form/utils/tests/formSetup';

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
