import React from 'react';
import FormComponent from './FormComponent';
import { clearAuthError } from '../../pages/Auth/duck/actions';
import { mainFormSetup as setup } from '../../../../tests/setup/formSetup';

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

const signinMeta = {
  title: 'Sign In to Your Account',
  btnText: 'SIGN IN',
  extra: <p>something</p>
};

describe('Form', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { shallowRoot } = setup('signin', signinMeta);

    expect(toJson(shallowRoot)).toMatchSnapshot();
  });


  it('disables submit button when form is clean', () => {
    const { shallowRoot } = setup('signin', signinMeta);

    expect(shallowRoot.find('button[disabled=true]')).toBeTruthy();
  });

  it('disables submit button when submitting form', () => {
    const { props, dispatchMock } = setup('signin', signinMeta);
    const newProps = {
      ...props,
      submitting: true
    };
    const shallowRoot = shallow(<FormComponent {...newProps} dispatch={dispatchMock} />);

    expect(toJson(shallowRoot)).toMatchSnapshot();
    expect(shallowRoot.find('button[disabled=true]')).toBeTruthy();
  });

  it('shows error alert and disables submit button when there\'s a submit error', () => {
    const { props, dispatchMock } = setup('signin', signinMeta);
    const newProps = {
      ...props,
      submitError: 'Username/Password do not match'
    };

    const shallowRoot = shallow(<FormComponent {...newProps} dispatch={dispatchMock} />);

    expect(toJson(shallowRoot)).toMatchSnapshot();
    expect(shallowRoot.find('p.danger')).toBeTruthy();
    expect(shallowRoot.find('button[disabled=true]')).toBeTruthy();
  });

  describe('test for right input', () => {
    it('calls handleChange and handleBlur on input change and blur for email field', (done) => {
      const { mountRoot, dispatchMock } = setup('signin', signinMeta);
      const wrapper = mountRoot.find(FormComponent);

      const changeState = {
        ...state,
        values: { ...state.values, email: 'iverenshaguy@gmail.com' },
        touched: { ...state.touched, email: true },
        error: { email: null, password: null },
        pristine: false
      };

      const blurState = {
        ...changeState,
        asyncValidating: false
      };

      const event = { target: { name: 'email', value: 'iverenshaguy@gmail.com' } };

      expect(toJson(wrapper)).toMatchSnapshot();

      wrapper.find('input[name="email"]').simulate('focus');
      expect(dispatchMock).toHaveBeenCalledWith(clearAuthError());

      wrapper.find('input[name="email"]').simulate('change', event);
      expect(wrapper.instance().state).toEqual(changeState);

      wrapper.find('input[name="email"]').simulate('blur', event);

      setTimeout(() => {
        expect(wrapper.instance().state).toEqual(blurState);
        done();
      }, 600);
    });

    it('submits valid form', () => {
      const { mountRoot, dispatchMock } = setup('signin', signinMeta);
      const wrapper = mountRoot.find(FormComponent);

      const newState = {
        ...state,
        values: { email: 'iverenshaguy@gmail.com', password: 'iverenshaguy' },
        touched: { email: true, password: true },
        error: { email: null, password: null },
        pristine: false,
        formValid: true
      };

      const emailEvent = { target: { name: 'email', value: 'iverenshaguy@gmail.com' } };
      const passwordEvent = { target: { name: 'password', value: 'iverenshaguy' } };

      wrapper.find('input[name="email"]').simulate('focus');
      wrapper.find('input[name="email"]').simulate('change', emailEvent);
      wrapper.find('input[name="password"]').simulate('focus');
      wrapper.find('input[name="password"]').simulate('change', passwordEvent);

      expect(wrapper.instance().state).toEqual(newState);

      wrapper.find('form').simulate('submit', { preventDefault() { } });
      expect(dispatchMock).toHaveBeenCalled();

      mountRoot.unmount();
    });
  });

  describe('test for wrong input', () => {
    it('sync validates field and form on input change and blur', () => {
      const { mountRoot } = setup('signin', signinMeta);
      const wrapper = mountRoot.find(FormComponent);


      const changeState = {
        ...state,
        values: { ...state.values, email: 'emiolaolasanmi' },
        touched: { ...state.touched, email: true },
        error: { email: 'Invalid email address!', password: null },
        pristine: false
      };

      const blurState = {
        ...changeState,
        asyncValidating: false
      };

      const event = { target: { name: 'email', value: 'emiolaolasanmi' } };

      wrapper.find('input[name="email"]').simulate('focus');
      wrapper.find('input[name="email"]').simulate('blur');
      expect(wrapper.instance().state).toEqual(({
        ...changeState, error: { email: 'Required!', password: null }, pristine: true, values: { ...state.values }
      }));

      wrapper.find('input[name="email"]').simulate('change', event);
      expect(wrapper.instance().state).toEqual({ ...changeState, error: { ...changeState.error, email: 'Required!' } });

      wrapper.find('input[name="email"]').simulate('blur', event);
      expect(wrapper.instance().state).toEqual(blurState);

      wrapper.find('input[name="password"]').simulate('focus');
      wrapper.find('input[name="password"]').simulate('blur');
      expect(wrapper.instance().state).toEqual(({
        ...changeState,
        error: { ...changeState.error, password: 'Required!' },
        touched: { email: true, password: true },
        values: { email: 'emiolaolasanmi', password: '' }
      }));

      mountRoot.unmount();
    });
  });
});
