import React from 'react';
import SigninForm from './SigninForm';
import { formComponentSetup } from '../../../../tests/setup/formSetup';

const state = {
  type: 'signin',
  values: {
    email: '',
    password: ''
  },
  touched: { email: false, password: false },
  error: { email: null, password: null },
  pristine: true,
  formValid: false,
  asyncValidating: false
};

describe('SigninForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { props: { handlers } } = formComponentSetup('signin');
    const wrapper = shallow(<SigninForm type="signin" state={state} handlers={handlers} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
