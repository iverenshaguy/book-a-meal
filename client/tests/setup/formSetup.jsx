import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { arrayToObject } from '../../src/utils';
import { formHelpers } from '../../src/helpers';
import FormComponent from '../../src/app/shared/Form/FormComponent';

const { formFields } = formHelpers;
const dispatchMock = jest.fn();
const formComponentSetup = type => ({
  type,
  state: {
    values: arrayToObject(formFields[type], ''),
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

  const mountRoot = mount( //eslint-disable-line
    <MemoryRouter>
      <FormComponent {...props} dispatch={dispatchMock} />
    </MemoryRouter>);

  const shallowRoot = shallow(<FormComponent {...props} dispatch={dispatchMock} />);

  return {
    props, dispatchMock, mountRoot, shallowRoot
  };
};

export default { formComponentSetup, mainFormSetup };
