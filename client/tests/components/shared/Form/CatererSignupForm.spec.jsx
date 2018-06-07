import React from 'react';
import CatererSignupForm from '../../../../src/app/shared/Form/CatererSignupForm';
import { formComponentSetup } from '../../../../tests/setup/formSetup';

describe('CatererSignupForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { handlers, state } = formComponentSetup('catererSignup');
    const wrapper = shallow(<CatererSignupForm type="catererSignup" state={state} handlers={handlers} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
