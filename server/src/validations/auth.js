import validator from 'validator';
import { check } from 'express-validator/check';
import usersDB from '../data/users.json';
import notEmpty from '../helpers/notEmpty';

export default {
  register: [
    check('role')
      .trim()
      .exists().withMessage('User Role must be specified')
      .custom(value => notEmpty(value, 'Role cannot be empty'))
      .isIn(['caterer', 'user', 'Caterer', 'User', 'CATERER', 'USER'])
      .withMessage('Role must be specified as Either Caterer or User'),
    check('firstname')
      .trim()
      .custom((value, { req }) => {
        if (req.body.role.toLowerCase() === 'caterer' && value) {
          throw new Error('Unaccepted Field');
        }

        return true;
      })
      .custom((value, { req }) => {
        if (req.body.role.toLowerCase() === 'user') {
          if (!req.body.firstname) throw new Error('Firstname must be specified');
          if (value.length > 40) throw new Error('Firstname must not be more than 40 characters');
          if (!validator.matches(value, /^[a-z ,.'-]+$/i)) {
            throw new Error('Firstname can only contain letters and the characters (,.\'-)');
          }
          return notEmpty(value, 'Firstname cannot be empty');
        }
        return true;
      }),
    check('businessName')
      .trim()
      .custom((value, { req }) => {
        if (req.body.role.toLowerCase() === 'user' && value) {
          throw new Error('Unaccepted Field');
        }

        return true;
      })
      .custom((value, { req }) => {
        if (req.body.role.toLowerCase() === 'caterer') {
          if (!req.body.businessName) throw new Error('Business Name must be specified');
          if (value.length > 60) throw new Error('Business Name must not be more than 60 characters');
          if (!validator.matches(value, /^[a-z ,.'-\s]+$/i)) {
            throw new Error('Business Name can only contain letters, spaces, and the characters (,.\'-)');
          }
          return notEmpty(value, 'Business Name cannot be empty');
        }
        return true;
      }),
    check('businessAddress')
      .trim()
      .custom((value, { req }) => {
        if (req.body.role.toLowerCase() === 'user' && value) {
          throw new Error('Unaccepted Field');
        }

        return true;
      })
      .custom((value, { req }) => {
        if (req.body.role.toLowerCase() === 'caterer') {
          if (!req.body.businessAddress) throw new Error('Business Address must be specified');
          if (value.length < 5 || value.length > 255) {
            throw new Error('Business Address must be between 5 and 255 characters');
          }
          if (!validator.matches(value, /^[a-z 0-9 (),.'-]+$/i)) {
            throw new Error('Business Address can only contain letters, numbers, spaces, and the characters (,.\'-)');
          }
          return notEmpty(value, 'Business Address cannot be empty');
        }
        return true;
      }),
    check('businessPhoneNo')
      .trim()
      .custom((value, { req }) => {
        if (req.body.role.toLowerCase() === 'user' && value) {
          throw new Error('Unaccepted Field');
        }

        return true;
      })
      .custom((value, { req }) => {
        if (req.body.role.toLowerCase() === 'caterer') {
          if (!req.body.businessPhoneNo) throw new Error('Business Phone Number must be specified');
          if (!validator.matches(value, /^\+?(234)([0-9]{10})$/)) {
            throw new Error('Business Phone Number must be in the format +2348134567890');
          }
          return notEmpty(value, 'Business Phone Number cannot be empty');
        }
        return true;
      }),
    check('email')
      .trim()
      .normalizeEmail()
      .exists()
      .withMessage('Email must be specified')
      .custom(value => notEmpty(value, 'Email cannot be empty'))
      .isEmail()
      .withMessage('Email is invalid')
      .custom((value) => {
        const checkUser = usersDB.find(user => user.email === value);
        if (checkUser) {
          throw new Error('Email already in use');
        }

        return true;
      }),
    check('password')
      .exists().withMessage('Password must be specified')
      .custom(value => notEmpty(value, 'Password cannot be empty'))
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters'),
    check('passwordConfirm', 'Passwords don\'t match')
      .exists().withMessage('Password Confirm field must be specified')
      .custom(value => notEmpty(value, 'Password Confirm field cannot be empty'))
      .custom((value, { req }) => value === req.body.password),
  ],
  login: [
    check('email')
      .trim()
      .normalizeEmail()
      .exists()
      .withMessage('Email must be specified')
      .custom(value => notEmpty(value, 'Email cannot be empty'))
      .isEmail()
      .withMessage('Email is invalid'),
    check('password')
      .exists().withMessage('Password must be specified')
      .custom(value => notEmpty(value, 'Password cannot be empty'))
  ]
};
