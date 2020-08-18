import React from 'react';
import CatererSignupForm from '../../../../src/components/shared/Form/CatererSignupForm';
import { formComponentSetup } from '../../../setup/formSetup';

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
