import moment from 'moment';
import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';
import checkMealsId from '../helpers/checkMealsId';
import isValidOrderItems from '../helpers/isValidOrderItems';

const yesterday = moment().subtract(1, 'days').format().toString();

export default {
  create: [
    check('date')
      .trim()
      .optional()
      .custom(value => notEmpty(value, 'Date cannot be empty'))
      .matches(/^\d{4}-\d{1,2}-\d{1,2}$/)
      .withMessage('Date is invalid, valid format is YYYY-MM-DD')
      .isAfter(yesterday)
      .withMessage('Date must be either today or in the future'),
    check('meals')
      .exists().withMessage('Meals must be specified')
      .custom(value => notEmpty(value, 'Meals cannot be empty'))
      .custom(value => checkMealsId(value))
      .custom((value, { req }) => isValidOrderItems(value, req)),
    check('deliveryAddress')
      .trim()
      .exists().withMessage('Delivery Address must be specified')
      .custom(value => notEmpty(value, 'Delivery Address cannot be empty'))
      .isLength({ min: 5, max: 255 })
      .withMessage('Text must be between 5 and 255 characters')
      .matches(/^[a-z 0-9 (),.'-]+$/i)
      .withMessage('Text can only contain letters and the characters (,.\'-)'),
    check('deliveryPhoneNo')
      .trim()
      .exists().withMessage('Delivery Phone Number must be specified')
      .custom(value => notEmpty(value, 'Delivery Phone Number cannot be empty'))
      .matches(/^\+?(234)([0-9]{10})$/)
      .withMessage('Delivery Phone Number must be in the format +2348134567890')
      .isLength({ min: 10, max: 15 })
      .withMessage('Delivery Phone Number must be between 10 and 15 characters'),
  ],
  update: [
    check('orderId')
      .isUUID(4)
      .withMessage('Invalid ID'),
    check('date')
      .trim()
      .optional()
      .custom(value => notEmpty(value, 'Date cannot be empty'))
      .matches(/^\d{4}-\d{1,2}-\d{1,2}$/)
      .withMessage('Date is invalid, valid format is YYYY-MM-DD')
      .isAfter(yesterday)
      .withMessage('Date must be either today or in the future'),
    check('meals')
      .exists().withMessage('Meals must be specified')
      .custom(value => notEmpty(value, 'Meals cannot be empty'))
      .custom(value => checkMealsId(value))
      .custom((value, { req }) => isValidOrderItems(value, req)),
    check('deliveryAddress')
      .trim()
      .optional()
      .custom(value => notEmpty(value, 'Delivery Address cannot be empty'))
      .isLength({ min: 5, max: 255 })
      .withMessage('Text must be between 5 and 255 characters')
      .matches(/^[a-z 0-9 (),.'-]+$/i)
      .withMessage('Text can only contain letters and the characters (,.\'-)'),
    check('deliveryPhoneNo')
      .trim()
      .optional()
      .custom(value => notEmpty(value, 'Delivery Phone Number cannot be empty'))
      .matches(/^\+?(234)([0-9]{10})$/)
      .withMessage('Delivery Phone Number must be in the format +2348134567890')
      .isLength({ min: 10, max: 15 })
      .withMessage('Price must be between 5 and 15 characters'),
  ],
  delete: [
    check('orderId')
      .isUUID(4)
      .withMessage('Invalid ID')
  ]
};

