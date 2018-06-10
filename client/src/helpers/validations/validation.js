import {
  isName,
  isAddress,
  isRequired,
  minLength1,
  minLength5,
  minLength8,
  maxLength40,
  maxLength50,
  maxLength60,
  maxLength255,
  isValidEmail,
  isValidDecimal,
  isValidBoolean,
  isGreaterThanZero,
  isMealName,
  isPhoneNumber,
  isBusinessName,
  isValidPasswordConfirm
} from './types';

const validation = {
  signin: {
    email: [isRequired, isValidEmail],
    password: [isRequired]
  },
  customerSignup: {
    firstname: [isRequired, maxLength40, isName],
    lastname: [isRequired, maxLength40, isName],
    email: [isRequired, isValidEmail],
    password: [isRequired, minLength8],
    passwordConfirm: [isRequired, isValidPasswordConfirm]
  },
  catererSignup: {
    businessName: [isRequired, maxLength60, isBusinessName],
    email: [isRequired, isValidEmail],
    password: [isRequired, minLength8],
    passwordConfirm: [isRequired, isValidPasswordConfirm],
    businessAddress: [isRequired, minLength5, maxLength255, isAddress],
    businessPhoneNo: [isRequired, isPhoneNumber],
  },
  addMeal: {
    title: [isRequired, minLength1, maxLength50, isMealName],
    price: [isRequired, isValidDecimal, isGreaterThanZero],
    description: [maxLength255, isBusinessName],
    vegetarian: [isValidBoolean]
  },
  editMeal: {
    title: [isRequired, minLength1, maxLength50, isMealName],
    price: [isRequired, isValidDecimal, isGreaterThanZero],
    description: [maxLength255, isBusinessName],
    vegetarian: [isValidBoolean]
  }
};

export default validation;
