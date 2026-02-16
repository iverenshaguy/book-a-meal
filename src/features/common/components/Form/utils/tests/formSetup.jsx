/* eslint-disable import/no-extraneous-dependencies */
import { arrayToObject, formHelpers } from 'src/features/common/utils/';
import { newMeal } from 'src/config/tests/fixtures';

const { formFields } = formHelpers;

export const formComponentSetup = (type) => ({
  type,
  state: {
    type: '',
    values: type === 'editMeal' ? newMeal : arrayToObject(formFields[type], ''),
    touched: arrayToObject(formFields[type], false),
    error: arrayToObject(formFields[type], null),
    pristine: true,
    formValid: false,
    asyncValidating: false,
  },
  handlers: {
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    handleFocus: jest.fn(),
    handleSubmit: jest.fn(),
  },
});

export default { formComponentSetup };
