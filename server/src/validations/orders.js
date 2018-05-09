import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';
import checkMealsId from '../helpers/checkMealsId';
import isValidOrderItems from '../helpers/isValidOrderItems';

export default {
  create: [
    check('meals')
      .exists().withMessage('Meals must be specified')
      .custom(value => notEmpty(value, 'Meals cannot be empty'))
      .custom(value => checkMealsId(value))
      .custom(value => isValidOrderItems(value)),
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
    check('meals')
      .exists().withMessage('Meals must be specified')
      .custom(value => notEmpty(value, 'Meals cannot be empty'))
      .custom(value => checkMealsId(value))
      .custom(value => isValidOrderItems(value)),
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

