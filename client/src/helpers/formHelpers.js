import { auth, clearAuthError } from '../store/operations/auth';

const clearFormError = {
  signin: clearAuthError(),
  customerSignup: clearAuthError(),
  catererSignup: clearAuthError(),
};

const formFields = {
  signin: ['email', 'password'],
  customerSignup: ['firstname', 'lastname', 'email', 'password', 'passwordConfirm', 'role'],
  catererSignup: ['businessName', 'email', 'password', 'passwordConfirm', 'businessAddress', 'businessPhoneNo', 'role'],
};

const requiredFormFields = {
  signin: ['email', 'password'],
  customerSignup: ['firstname', 'lastname', 'email', 'password', 'passwordConfirm'],
  catererSignup: ['businessName', 'email', 'password', 'passwordConfirm', 'businessAddress', 'businessPhoneNo'],
};

const formSubmitMapper = {
  signin: auth('signin'),
  customerSignup: auth('signup'),
  catererSignup: auth('signup'),
};

const asyncValidateFields = ['businessName', 'email'];

export default {
  formFields,
  clearFormError,
  formSubmitMapper,
  requiredFormFields,
  asyncValidateFields
};
