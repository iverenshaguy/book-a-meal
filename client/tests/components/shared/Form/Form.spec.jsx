import React from 'react';
import FormComponent from '../../../../src/components/shared/Form';
import { clearAuthError } from '../../../../src/actions/auth';
import { mainFormSetup as setup, formComponentSetup } from '../../../../tests/setup/formSetup';

const signinState = {
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

const meta = {
  btnText: 'SIGN IN',
  extra: <p>something</p>
};

describe('Form', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render the Form component correctly', () => {
    const { shallowRoot } = setup('signin', meta);

    expect(toJson(shallowRoot)).toMatchSnapshot();
  });

  it('should render the Customer Signup Form correctly when the type prop is customerSignup', () => {
    const { shallowRoot } = setup('customerSignup', meta);

    expect(toJson(shallowRoot)).toMatchSnapshot();
  });

  it('should render the Caterer Signup Form correctly when the type prop is customerSignup', () => {
    const { shallowRoot } = setup('catererSignup', meta);

    expect(toJson(shallowRoot)).toMatchSnapshot();
  });

  it('should render the Add Meal Form correctly when the type prop is addMeal', () => {
    const { shallowRoot } = setup('addMeal', meta);

    expect(toJson(shallowRoot)).toMatchSnapshot();
  });

  it('should render the Edit Meal Form correctly when the type prop is editMeal', () => {
    const { shallowRoot } = setup('editMeal', meta);

    expect(toJson(shallowRoot)).toMatchSnapshot();
  });

  it('should disable the form submit button when the form has not been touched', () => {
    const { shallowRoot } = setup('signin', meta);

    expect(shallowRoot.find('button[disabled=true]')).toBeTruthy();
  });

  it('should disable the form submit button when submitting the form', () => {
    const { props, dispatchMock } = setup('signin', meta);
    const newProps = {
      ...props,
      submitting: true
    };
    const shallowRoot = shallow(<FormComponent {...newProps} dispatch={dispatchMock} />);

    expect(toJson(shallowRoot)).toMatchSnapshot();
    expect(shallowRoot.find('button[disabled=true]')).toBeTruthy();
  });

  it('should show an error alert and disable the form submit button when there\'s a submit error', () => {
    const { props, dispatchMock } = setup('signin', meta);
    const newProps = {
      ...props,
      submitError: 'Username/Password do not match'
    };

    const shallowRoot = shallow(<FormComponent {...newProps} dispatch={dispatchMock} />);

    expect(toJson(shallowRoot)).toMatchSnapshot();
    expect(shallowRoot.find('p.danger')).toBeTruthy();
    expect(shallowRoot.find('button[disabled=true]')).toBeTruthy();
  });

  it('should change the form state when the type prop changes', () => {
    const { props, dispatchMock } = setup('signin', meta);

    const shallowRoot = shallow(<FormComponent {...props} dispatch={dispatchMock} />);

    shallowRoot.setProps({ type: 'editMeal' });

    expect(shallowRoot.state().type).toEqual('editMeal');
  });

  it('should not change the form state when the type prop does not change but the form props update', () => {
    const { props, dispatchMock } = setup('signin', meta);

    const shallowRoot = shallow(<FormComponent {...props} dispatch={dispatchMock} />);

    shallowRoot.setProps({
      type: 'signin',
      test: 'test'
    });

    expect(shallowRoot.state().type).toEqual('signin');
    expect(shallowRoot.state().test).toEqual(undefined);
  });

  describe('test for right input', () => {
    it('should handle input change on input change for email field', () => {
      const { mountRoot, dispatchMock } = setup('signin', meta);
      const wrapper = mountRoot.find(FormComponent);

      const changeState = {
        ...signinState,
        values: { ...signinState.values, email: 'iverenshaguy@gmail.com' },
        touched: { ...signinState.touched, email: true },
        error: { email: null, password: null },
        pristine: false
      };

      const event = { target: { name: 'email', value: 'iverenshaguy@gmail.com' } };

      wrapper.find('input[name="email"]').simulate('focus');
      expect(dispatchMock).toHaveBeenCalledWith(clearAuthError());

      wrapper.find('input[name="email"]').simulate('change', event);
      expect(wrapper.instance().state).toEqual(changeState);

      wrapper.find('input[name="email"]').simulate('blur');
      expect(wrapper.instance().state).toEqual(changeState);
    });

    it('should handle input change on checkbox change for vegetarian field', () => {
      const { state } = formComponentSetup('addMeal');
      const { mountRoot } = setup('addMeal', meta);
      const wrapper = mountRoot.find(FormComponent);

      const changeState = {
        ...state,
        type: 'addMeal',
        values: { ...state.values, vegetarian: 'true', imageUrl: 'http://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg' },
        touched: { ...state.touched, vegetarian: true },
        pristine: false
      };

      const event = { target: { name: 'vegetarian', type: 'checkbox', checked: 'true' } };

      wrapper.find('input[name="vegetarian"]').simulate('change', event);
      expect(wrapper.instance().state).toEqual(changeState);
    });

    it('should submit a valid form', () => {
      const { mountRoot, dispatchMock } = setup('signin', meta);
      const wrapper = mountRoot.find(FormComponent);

      const newState = {
        ...signinState,
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
    });

    it('should submit a valid editMeal form', () => {
      const { mountRoot, dispatchMock } = setup('editMeal', meta);
      const wrapper = mountRoot.find(FormComponent);

      const titleEvent = { target: { name: 'title', value: 'Rice' } };

      wrapper.find('input[name="title"]').simulate('focus');
      wrapper.find('input[name="title"]').simulate('change', titleEvent);

      wrapper.find('form').simulate('submit', { preventDefault() { } });
      expect(dispatchMock).toHaveBeenCalled();
    });

    it('should call the dispatch function on file input change', () => {
      const { mountRoot, dispatchMock } = setup('editMeal', meta);
      const wrapper = mountRoot.find(FormComponent);

      const event = {
        target: {
          files: [new Blob([''], {
            type: 'image/jpeg',
            size: '500'
          })]
        }
      };

      mocksdk.storage().refFromURL = () => ({
        delete: jest.fn()
      });

      mocksdk.storage().ref = () => ({
        put: () => ({
          ref: {
            getDownloadURL: () => ({
              then: (fn) => {
                fn('http.url.test');
              }
            })
          }
        })
      });

      wrapper.find('input[name="imageUrl"]').simulate('change', event);

      expect(dispatchMock).toHaveBeenCalled();
    });
  });

  describe('test for wrong input', () => {
    it('should sync validate field and form on input change and blur', () => {
      const { state } = formComponentSetup('customerSignup');
      const { mountRoot } = setup('customerSignup', meta);
      const wrapper = mountRoot.find(FormComponent);


      const changeState = {
        ...state,
        values: { ...state.values, email: 'emiolaolasanmi', role: 'customer' },
        touched: { ...state.touched, email: true },
        error: { ...state.error, email: 'Invalid email address!', password: null },
        pristine: false,
        type: 'customerSignup',
      };

      const blurState = {
        ...changeState,
        asyncValidating: false
      };

      const event = { target: { name: 'email', value: 'emiolaolasanmi' } };

      wrapper.find('input[name="email"]').simulate('focus');
      wrapper.find('input[name="email"]').simulate('blur');
      expect(wrapper.instance().state).toEqual(({
        ...changeState,
        error: {
          ...changeState.error, email: 'Required!', password: null
        },
        pristine: true,
        values: { ...state.values, role: 'customer' }
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
        touched: { ...changeState.touched, email: true, password: true },
        values: { ...changeState.values, email: 'emiolaolasanmi', password: '' }
      }));
    });
  });
});
