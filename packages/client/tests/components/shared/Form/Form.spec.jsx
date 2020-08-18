import React from 'react';
import FormComponent from '../../../../src/components/shared/Form';
import { clearAuthError } from '../../../../src/actions/auth';
import { mainFormSetup as setup } from '../../../setup/formSetup';

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

  it('should call settimeout 500ms after field is changed', () => {
    jest.useFakeTimers();

    const { mountRoot } = setup('signin', meta);
    const wrapper = mountRoot.find(FormComponent);

    const event = { target: { name: 'email', value: 'iverenshaguy@gmail.com' } };

    wrapper.find('input[name="email"]').simulate('change', event);

    jest.advanceTimersByTime(1000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
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

      const event = { target: { name: 'email', value: 'iverenshaguy@gmail.com' } };

      wrapper.find('input[name="email"]').simulate('focus');
      expect(dispatchMock).toHaveBeenCalledWith(clearAuthError());

      wrapper.find('input[name="email"]').simulate('change', event);
      expect(wrapper.instance().state.values.email).toEqual('iverenshaguy@gmail.com');
      expect(wrapper.instance().state.touched.email).toEqual(true);
      expect(wrapper.instance().state.error.email).toEqual(null);
      expect(wrapper.instance().state.pristine).toEqual(false);

      wrapper.find('input[name="email"]').simulate('blur');
      expect(wrapper.instance().state.values.email).toEqual('iverenshaguy@gmail.com');
      expect(wrapper.instance().state.touched.email).toEqual(true);
      expect(wrapper.instance().state.error.email).toEqual(null);
      expect(wrapper.instance().state.pristine).toEqual(false);
    });

    it('should handle input change on checkbox change for vegetarian field', () => {
      const { mountRoot } = setup('addMeal', meta);
      const wrapper = mountRoot.find(FormComponent);

      const event = { target: { name: 'vegetarian', type: 'checkbox', checked: true } };

      wrapper.find('input[name="vegetarian"]').simulate('change', event);
      expect(wrapper.instance().state.values.vegetarian).toEqual(true);
      expect(wrapper.instance().state.touched.vegetarian).toEqual(true);
      expect(wrapper.instance().state.error.vegetarian).toEqual(null);
      expect(wrapper.instance().state.pristine).toEqual(false);
    });

    it('should submit a valid form', () => {
      const { mountRoot, dispatchMock } = setup('signin', meta);
      const wrapper = mountRoot.find(FormComponent);

      const emailEvent = { target: { name: 'email', value: 'iverenshaguy@gmail.com' } };
      const passwordEvent = { target: { name: 'password', value: 'iverenshaguy' } };

      wrapper.find('input[name="email"]').simulate('focus');
      wrapper.find('input[name="email"]').simulate('change', emailEvent);
      wrapper.find('input[name="password"]').simulate('focus');
      wrapper.find('input[name="password"]').simulate('change', passwordEvent);

      expect(wrapper.instance().state.values.email).toEqual('iverenshaguy@gmail.com');
      expect(wrapper.instance().state.touched.email).toEqual(true);
      expect(wrapper.instance().state.error.email).toEqual(null);
      expect(wrapper.instance().state.values.password).toEqual('iverenshaguy');
      expect(wrapper.instance().state.touched.password).toEqual(true);
      expect(wrapper.instance().state.error.password).toEqual(null);
      expect(wrapper.instance().state.pristine).toEqual(false);
      expect(wrapper.instance().state.formValid).toEqual(true);

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

    it('should submit a valid resetPassword form', () => {
      const { mountRoot, dispatchMock } = setup('resetPassword', meta);
      const wrapper = mountRoot.find(FormComponent);

      const passwordEvent = { target: { name: 'password', value: 'olisaemodi' } };
      const passwordConfirmEvent = { target: { name: 'passwordConfirm', value: 'olisaemodi' } };

      wrapper.find('input[name="password"]').simulate('focus');
      wrapper.find('input[name="password"]').simulate('change', passwordEvent);

      wrapper.find('input[name="passwordConfirm"]').simulate('focus');
      wrapper.find('input[name="passwordConfirm"]').simulate('change', passwordConfirmEvent);

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
      const { mountRoot } = setup('customerSignup', meta);
      const wrapper = mountRoot.find(FormComponent);

      const event = { target: { name: 'email', value: 'emiolaolasanmi' } };

      wrapper.find('input[name="email"]').simulate('focus');
      wrapper.find('input[name="email"]').simulate('blur');
      expect(wrapper.instance().state.error.email).toEqual('Required!');

      wrapper.find('input[name="email"]').simulate('change', event);
      wrapper.find('input[name="email"]').simulate('blur', event);

      expect(wrapper.instance().state.values.email).toEqual('emiolaolasanmi');
      expect(wrapper.instance().state.touched.email).toEqual(true);
      expect(wrapper.instance().state.error.email).toEqual('Invalid email address!');

      wrapper.find('input[name="password"]').simulate('focus');
      wrapper.find('input[name="password"]').simulate('blur');
      expect(wrapper.instance().state.error.password).toEqual('Required!');
    });
  });
});
