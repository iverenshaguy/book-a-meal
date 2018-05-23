import isEmail from 'validator/lib/isEmail';

export const isRequired = value => (value ? undefined : 'Required!');

export const maxLength = max => value =>
  (value && value.length > max ? `Must be ${max} characters or less!` : undefined);

export const maxLength15 = maxLength(15);
export const maxLength25 = maxLength(25);
export const maxLength144 = maxLength(144);
export const maxLength255 = maxLength(255);

export const minLength = min => value =>
  (value && value.length < min ? `Must be ${min} characters or more!` : undefined);

export const minLength1 = minLength(1);
export const minLength2 = minLength(2);
export const minLength3 = minLength(3);
export const minLength10 = minLength(10);

export const isNumber = value => (value && isNaN(Number(value)) ? `Must be a number!` : undefined); // eslint-disable-line

export const minValue = min => value =>
  (value && value < min ? `Must be at least ${min}!` : undefined);
export const minValue18 = minValue(18);

export const isValidEmail = value =>
  (value && !isEmail(value)
    ? 'Invalid email address!'
    : undefined);

export const isName = value =>
  (value && !(/^[a-z'-]+$/i.test(value))
    ? "Only letters and the characters '- allowed!"
    : undefined);

export const isBusinessName = value =>
  (value && !(/^[a-z0-9 ,.'-]+$/i.test(value))
    ? "Only letters, spaces and the characters ,.'- allowed!"
    : undefined);

export const isAddress = value =>
  (value && !(/^[a-z0-9 (),.'-]+$/i.test(value))
    ? "Only letters, numbers, spaces and the characters ,.'- allowed!"
    : undefined);

export const isPhoneNumber = value =>
  (value && !(/^(0|[1-9][0-9]{9})$/i.test(value))
    ? 'Phone number is invalid, must be 10 digits!'
    : undefined);

export const isValidPasswordConfirm = (value, allValues) => {
  if (value !== allValues.password) {
    return 'Passwords do not match';
  }
  return undefined;
};
