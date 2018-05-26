import {
  isName,
  isAddress,
  isRequired,
  minLength5,
  minLength8,
  maxLength40,
  maxLength60,
  maxLength255,
  isValidEmail,
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
};

export default validation;
