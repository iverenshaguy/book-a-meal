import { check } from 'express-validator/check';
import usersDB from '../dummyData/users';
import notEmpty from '../helpers/notEmpty';

export default {
  register: [
    check('firstname')
      .trim()
      .exists().withMessage('Firstname must be specified')
      .custom(value => notEmpty(value, 'Firstname cannot be empty'))
      .isLength({ max: 40 })
      .withMessage('Firstname must not be more than 40 characters')
      .matches(/^[a-z ,.'-\s]+$/i)
      .withMessage('Firstname can only contain letters and the characters (,.\'-)'),
    check('lastname')
      .trim()
      .exists().withMessage('Lastname must be specified')
      .custom(value => notEmpty(value, 'Lastname cannot be empty'))
      .isLength({ max: 40 })
      .withMessage('Last name must not be more than 40 characters')
      .matches(/^[a-z ,.'-]+$/i)
      .withMessage('Last name can only contain letters and the characters (,.\'-)'),
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
