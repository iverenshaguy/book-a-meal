import { auth, clearAuthError } from '../store/operations/auth';
import { clearMealError, addMeal } from '../store/operations/meals';

const clearFormError = {
  signin: clearAuthError(),
  customerSignup: clearAuthError(),
  catererSignup: clearAuthError(),
  addMeal: clearMealError()
};

const formFields = {
  signin: ['email', 'password'],
  customerSignup: ['firstname', 'lastname', 'email', 'password', 'passwordConfirm', 'role'],
  catererSignup: ['businessName', 'email', 'password', 'passwordConfirm', 'businessAddress', 'businessPhoneNo', 'role'],
  addMeal: ['title', 'price', 'description', 'vegetarian'],
};

const requiredFormFields = {
  signin: ['email', 'password'],
  customerSignup: ['firstname', 'lastname', 'email', 'password', 'passwordConfirm'],
  catererSignup: ['businessName', 'email', 'password', 'passwordConfirm', 'businessAddress', 'businessPhoneNo'],
  addMeal: ['title', 'price'],
};

const formSubmitMapper = {
  signin: auth('signin'),
  customerSignup: auth('signup'),
  catererSignup: auth('signup'),
  addMeal
};

const asyncValidateFields = ['businessName', 'email', 'title'];

export default {
  formFields,
  clearFormError,
  formSubmitMapper,
  requiredFormFields,
  asyncValidateFields
};
