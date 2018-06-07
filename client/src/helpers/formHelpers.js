import { operations } from '../app/pages/Auth/duck';

const { auth, clearAuthError } = operations;

const clearFormError = {
  signin: clearAuthError()
};

const formFields = {
  signin: ['email', 'password']
};

const requiredFormFields = {
  signin: ['email', 'password']
};

const formSubmitMapper = {
  signin: auth('signin')
};

const asyncValidateFields = ['businessName', 'email'];

export default {
  formFields,
  clearFormError,
  formSubmitMapper,
  requiredFormFields,
  asyncValidateFields
};
