import isEmail from 'validator/lib/isEmail';
import isDecimal from 'validator/lib/isDecimal';
import isBoolean from 'validator/lib/isBoolean';

export const isRequired = value => (value ? undefined : 'Required!');

export const maxLength = max => value =>
  (value && value.length > max ? `Must be ${max} characters or less!` : undefined);

export const maxLength25 = maxLength(25);
export const maxLength40 = maxLength(40);
export const maxLength50 = maxLength(50);
export const maxLength60 = maxLength(60);
export const maxLength100 = maxLength(100);
export const maxLength144 = maxLength(144);
export const maxLength255 = maxLength(255);

export const minLength = min => value =>
  (value && value.length < min ? `Must be ${min} characters or more!` : undefined);

export const minLength1 = minLength(1);
export const minLength2 = minLength(2);
export const minLength5 = minLength(5);
export const minLength8 = minLength(8);

export const isNumber = value => (value && isNaN(Number(value)) ? `Must be a number!` : undefined); // eslint-disable-line

export const minValue = min => value =>
  (value && value < min ? `Must be at least ${min}!` : undefined);

export const minValue18 = minValue(18);

export const isGreaterThanZero = value =>
  (value && value <= 0 ? 'Must be greater than 0!' : undefined);


export const isValidEmail = value =>
  (value && !isEmail(value)
    ? 'Invalid email address!'
    : undefined);

export const isValidDecimal = value =>
  (value && !isDecimal(`${value}`)
    ? 'Price must be a number or decimal!'
    : undefined);

export const isValidBoolean = value =>
  (value && !isBoolean(`${value}`)
    ? 'Accepts only true or false!'
    : undefined);

export const isName = value =>
  (value && !(/^[a-z'-]+$/i.test(value))
    ? "Only letters and the characters '- allowed!"
    : undefined);

export const isBusinessName = value =>
  (value && !(/^[a-z0-9 (),.'-]+$/i.test(value))
    ? "Only letters, numbers, spaces and the characters (,.'-) allowed!"
    : undefined);

export const isMealName = value =>
  (value && !(/^[a-z (),.'-]+$/i.test(value))
    ? "Only letters, spaces and the characters (,.'-) allowed!"
    : undefined);

export const isAddress = value => isBusinessName(value);

export const isPhoneNumber = value =>
  (value && !(/^\+?(0)[7-9]([0-9]{9})$/.test(value))
    ? 'Phone number is invalid, must be in the format 08134567890'
    : undefined);

export const isValidPasswordConfirm = (value, allValues) => {
  if (value !== allValues.password) {
    return 'Passwords do not match';
  }
  return undefined;
};
