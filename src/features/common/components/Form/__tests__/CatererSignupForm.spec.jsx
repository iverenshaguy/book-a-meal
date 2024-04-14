import React from 'react';
import CatererSignupForm from 'src/features/common/components/Form/CatererSignupForm';
import { formComponentSetup } from 'src/features/common/components/Form/utils/tests/formSetup';

describe('CatererSignupForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the Caterer Signup Form correctly', () => {
    const { handlers, state } = formComponentSetup('catererSignup');
    const wrapper = shallow(<CatererSignupForm type="catererSignup" state={state} handlers={handlers} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
