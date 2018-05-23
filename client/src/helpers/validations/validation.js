import {
  isRequired,
  isValidEmail,
} from './types';

const validation = {
  signin: {
    email: [isRequired, isValidEmail],
    password: [isRequired]
  },
};

export default validation;
