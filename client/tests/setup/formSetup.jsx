import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { arrayToObject, formHelpers } from '../../src/helpers';
import FormComponent from '../../src/components/shared/Form';
import { newMeal, initialState } from './mockData';

const { formFields } = formHelpers;
const dispatchMock = jest.fn();
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);
const token = 'sdfghjklfghjbknlmdfghjklnmghjkl';

const formComponentSetup = type => ({
  type,
  state: {
    type: '',
    values: type === 'editMeal' ? newMeal : arrayToObject(formFields[type], ''),
    touched: arrayToObject(formFields[type], false),
    error: arrayToObject(formFields[type], null),
    pristine: true,
    formValid: false,
    asyncValidating: false
  },
  handlers: {
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    handleFocus: jest.fn(),
    handleSubmit: jest.fn()
  }
});

const mainFormSetup = (type, meta) => {
  const props = {
    submitting: false,
    submitError: null,
    type,
    meta
  };

  const comp =
    (
      <Provider store={store}>
        <FormComponent
          {...props}
          meal={type === 'editMeal' ? newMeal : null}
          token={type === 'resetPassword' ? token : null}
          dispatch={dispatchMock}
        />
      </Provider>
    );

  const mountRoot = mount(comp);

  const shallowRoot = shallow(<FormComponent
    {...props}
    meal={type === 'editMeal' ? newMeal : null}
    token={type === 'resetPassword' ? token : null}
    dispatch={dispatchMock}
  />);

  return {
    props, dispatchMock, mountRoot, shallowRoot
  };
};

export default { formComponentSetup, mainFormSetup };
