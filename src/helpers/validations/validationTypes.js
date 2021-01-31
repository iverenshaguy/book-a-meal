import isEmail from 'validator/lib/isEmail';
import isDecimal from 'validator/lib/isDecimal';
import isBoolean from 'validator/lib/isBoolean';

/**
 * Checks whether value was supplied
 * @function isRequired
 * @param {string} value
 * @returns {undefined|string} returns undefined or error string
 */
export const isRequired = value => (value ? undefined : 'Required!');

/**
 * Checks whether character is more than required length
 * @function maxLength
 * @param {number} max maximum number of characters allowed
 * @param {string} value value to check
 * @returns {undefined|string} returns undefined or error string
 */
export const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less!` : undefined);

export const maxLength25 = maxLength(25);
export const maxLength40 = maxLength(40);
export const maxLength50 = maxLength(50);
export const maxLength60 = maxLength(60);
export const maxLength100 = maxLength(100);
export const maxLength144 = maxLength(144);
export const maxLength255 = maxLength(255);

/**
 * Checks whether character is less than required length
 * @function minLength
 * @param {number} min minimum number of characters allowed
 * @param {string} value value to check
 * @returns {undefined|string} returns undefined or error string
 */
export const minLength = min => value => (value && value.length < min ? `Must be ${min} characters or more!` : undefined);

export const minLength1 = minLength(1);
export const minLength2 = minLength(2);
export const minLength5 = minLength(5);
export const minLength8 = minLength(8);

/**
 * Checks whether value is a number
 * @function isNumber
 * @param {number} value value to check
 * @returns {undefined|string} returns undefined or error string
 */
export const isNumber = value => (value && Number.isNaN(Number(value)) ? 'Must be a number!' : undefined);

/**
 * Checks whether supplied value is less than required value
 * @function minValue
 * @param {number} min minimum value
 * @param {number} value value to check
 * @returns {undefined|string} returns undefined or error string
 */
export const minValue = min => value => (value && value < min ? `Must be at least ${min}!` : undefined);

export const minValue18 = minValue(18);

/**
 * Checks whether supplied value is greater than zero
 * @function isGreaterThanZero
 * @param {number} value value to check
 * @returns {undefined|string} returns undefined or error string
 */
export const isGreaterThanZero = value => (value && value <= 0 ? 'Must be greater than 0!' : undefined);

/**
 * Checks whether value is a valid email address
 * @function isValidEmail
 * @param {string} value email to check
 * @returns {undefined|string} returns undefined or error string
 */
export const isValidEmail = value => (value && !isEmail(value)
  ? 'Invalid email address!'
  : undefined);

/**
 * Checks whether value is a valid decimal or number
 * @function isValidDecimal
 * @param {number|decimal} value value to check
 * @returns {undefined|string} returns undefined or error string
 */
export const isValidDecimal = value => (value && !isDecimal(`${value}`)
  ? 'Price must be a number or decimal!'
  : undefined);

/**
 * Checks whether value is a valid boolean
 * @function isValidBoolean
 * @param {bool} value value to check
 * @returns {undefined|string} returns undefined or error string
 */
export const isValidBoolean = value => (value && !isBoolean(`${value}`)
  ? 'Accepts only true or false!'
  : undefined);

/**
 * Checks whether value is a valid name
 * @function isName
 * @param {string} value value to check
 * @returns {undefined|string} returns undefined or error string
 */
export const isName = value => (value && !(/^[a-z'-]+$/i.test(value))
  ? "Only letters and the characters '- allowed!"
  : undefined);

/**
 * Checks whether value is a valid business name
 * @function isBusinessName
 * @param {string} value value to check
 * @returns {undefined|string} returns undefined or error string
 */
export const isBusinessName = value => (value && !(/^[a-z0-9 (),.'-]+$/i.test(value))
  ? "Only letters, numbers, spaces and the characters (,.'-) allowed!"
  : undefined);

/**
 * Checks whether value is a valid meal name
 * @function isMealName
 * @param {string} value value to check
 * @returns {undefined|string} returns undefined or error string
 */
export const isMealName = value => (value && !(/^[a-z (),.'-]+$/i.test(value))
  ? "Only letters, spaces and the characters (,.'-) allowed!"
  : undefined);

/**
 * Checks whether value is a valid address
 * @function isAddress
 * @param {string} value value to check
 * @returns {undefined|string} returns undefined or error string
 */
export const isAddress = value => isBusinessName(value);

/**
 * Checks whether value is a valid phone number
 * @function isPhoneNumber
 * @param {string|number} value value to check
 * @returns {undefined|string} returns undefined or error string
 */
export const isPhoneNumber = value => (value && !(/^\+?(0)[7-9]([0-9]{9})$/.test(value))
  ? 'Phone number is invalid, must be in the format 080xxxxxxxx'
  : undefined);

/**
 * Checks whether value is a valid password confirmation
 * @function isValidPasswordConfirm
 * @param {string} value value to check
 *  @param {object} allValues all form values
 * @returns {undefined|string} returns undefined or error string
 */
export const isValidPasswordConfirm = (value, allValues) => {
  if (value !== allValues.password) {
    return 'Passwords do not match';
  }
  return undefined;
};
