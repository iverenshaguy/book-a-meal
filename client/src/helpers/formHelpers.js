import { auth, clearAuthError } from '../actions/auth';
import { clearMealError, addMeal, editMeal } from '../actions/meals';

const clearFormError = {
  signin: clearAuthError(),
  customerSignup: clearAuthError(),
  catererSignup: clearAuthError(),
  addMeal: clearMealError(),
  editMeal: clearMealError()
};

const formFields = {
  signin: ['email', 'password'],
  customerSignup: ['firstname', 'lastname', 'email', 'password', 'passwordConfirm', 'role'],
  catererSignup: ['businessName', 'email', 'password', 'passwordConfirm', 'address', 'phoneNo', 'role'],
  addMeal: ['title', 'price', 'imageUrl', 'description', 'vegetarian'],
  editMeal: ['title', 'price', 'imageUrl', 'description', 'vegetarian'],
};

const requiredFormFields = {
  signin: ['email', 'password'],
  customerSignup: ['firstname', 'lastname', 'email', 'password', 'passwordConfirm'],
  catererSignup: ['businessName', 'email', 'password', 'passwordConfirm', 'address', 'phoneNo'],
  addMeal: ['title', 'price'],
  editMeal: ['title', 'price'],
};

const formSubmitMapper = {
  signin: auth('signin'),
  customerSignup: auth('signup'),
  catererSignup: auth('signup'),
  addMeal,
  editMeal
};

export default {
  formFields,
  clearFormError,
  formSubmitMapper,
  requiredFormFields
};
