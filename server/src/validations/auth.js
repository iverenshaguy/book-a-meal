import validator from 'validator';
import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';
import db from '../models';

export default {
  register: [
    check('role')
      .trim()
      .exists().withMessage('User role must be specified')
      .custom(value => notEmpty(value, 'Role cannot be empty'))
      .isIn(['caterer', 'user'])
      .withMessage('Role must be specified as either caterer or user'),
    check('username')
      .trim()
      .custom((value, { req }) => {
        if (req.body.role && req.body.role === 'caterer' && value) {
          throw new Error('Unaccepted Field');
        }

        return true;
      })
      .custom((value, { req }) => {
        if (req.body.role && req.body.role === 'user') {
          if (!req.body.username) throw new Error('username must be specified');
          if (value.length > 40) throw new Error('username must not be more than 40 characters');
          if (!validator.matches(value, /^[a-z ,.'-]+$/i)) {
            throw new Error('username can only contain letters and the characters (,.\'-)');
          }
          return notEmpty(value, 'username cannot be empty');
        }
        return true;
      })
      .custom(value => db.User.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          throw new Error('Username already in use');
        }

        return true;
      })),
    check('businessName')
      .trim()
      .custom((value, { req }) => {
        if (req.body.role && req.body.role === 'user' && value) {
          throw new Error('Unaccepted Field');
        }

        return true;
      })
      .custom((value, { req }) => {
        if (req.body.role && req.body.role === 'caterer') {
          if (!req.body.businessName) throw new Error('Business name must be specified');
          if (value.length > 60) throw new Error('Business name must not be more than 60 characters');
          if (!validator.matches(value, /^[a-z ,.'-\s]+$/i)) {
            throw new Error('Business name can only contain letters, spaces, and the characters (,.\'-)');
          }
          return notEmpty(value, 'Business name cannot be empty');
        }
        return true;
      })
      .custom(value => db.User.findOne({ where: { businessName: value } }).then((user) => {
        if (user) {
          throw new Error('Business name already in use');
        }

        return true;
      })),
    check('businessAddress')
      .trim()
      .custom((value, { req }) => {
        if (req.body.role && req.body.role === 'user' && value) {
          throw new Error('Unaccepted Field');
        }

        return true;
      })
      .custom((value, { req }) => {
        if (req.body.role && req.body.role === 'caterer') {
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
        if (req.body.role && req.body.role === 'user' && value) {
          throw new Error('Unaccepted Field');
        }

        return true;
      })
      .custom((value, { req }) => {
        if (req.body.role && req.body.role === 'caterer') {
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
      .custom(value => notEmpty(value, 'Email must be specified'))
      .isEmail()
      .withMessage('Email is invalid')
      .custom(value => db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          throw new Error('Email already in use');
        }

        return true;
      })),
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
      .custom(value => notEmpty(value, 'Email must be specified'))
      .isEmail()
      .withMessage('Email is invalid'),
    check('password')
      .exists().withMessage('Password must be specified')
      .custom(value => notEmpty(value, 'Password cannot be empty'))
  ]
};
