import {
  auth,
  clearAuthError,
  forgotPassword,
  resetPassword
} from '../actions/auth';
import { clearMealError, addMeal, editMeal } from '../actions/meals';

export const clearFormError = {
  signin: clearAuthError(),
  customerSignup: clearAuthError(),
  catererSignup: clearAuthError(),
  addMeal: clearMealError(),
  editMeal: clearMealError(),
  resetPassword: clearAuthError(),
  forgotPassword: clearAuthError()
};

export const formFields = {
  signin: ['email', 'password'],
  customerSignup: ['firstname', 'lastname', 'email', 'password', 'passwordConfirm', 'role'],
  catererSignup: ['businessName', 'email', 'password', 'passwordConfirm', 'address', 'phoneNo', 'role'],
  addMeal: ['title', 'price', 'imageUrl', 'description', 'vegetarian'],
  editMeal: ['title', 'price', 'imageUrl', 'description', 'vegetarian'],
  resetPassword: ['password', 'passwordConfirm'],
  forgotPassword: ['email']
};

export const requiredFormFields = {
  signin: ['email', 'password'],
  customerSignup: ['firstname', 'lastname', 'email', 'password', 'passwordConfirm'],
  catererSignup: ['businessName', 'email', 'password', 'passwordConfirm', 'address', 'phoneNo'],
  addMeal: ['title', 'price'],
  editMeal: ['title', 'price'],
  resetPassword: ['password', 'passwordConfirm'],
  forgotPassword: ['email']
};

export const formSubmitMapper = {
  signin: auth('signin'),
  customerSignup: auth('signup'),
  catererSignup: auth('signup'),
  addMeal,
  editMeal,
  resetPassword,
  forgotPassword
};

export default {
  formFields,
  clearFormError,
  formSubmitMapper,
  requiredFormFields
};
