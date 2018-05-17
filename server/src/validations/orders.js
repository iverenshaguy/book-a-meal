import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';
import checkOrderMeals from '../helpers/checkOrderMeals';
import checkOrderMealsId from '../helpers/checkOrderMealsId';
import checkOrderQuantity from '../helpers/checkOrderQuantity';
import isValidOrderItems from '../helpers/isValidOrderItems';

export default {
  create: [
    check('meals')
      .exists().withMessage('Meals must be specified')
      .custom(value => notEmpty(value, 'Meals field cannot be left blank'))
      .custom(value => Array.isArray(value))
      .withMessage('Meals must be an array of Meal objects')
      .custom(value => checkOrderMeals(value))
      .custom(value => checkOrderMealsId(value))
      .custom(value => checkOrderQuantity(value))
      .custom(value => isValidOrderItems(value)),
    check('status')
      .custom(value => !value)
      .withMessage('Status should not be provided'),
    check('deliveryAddress')
      .trim()
      .exists().withMessage('Delivery Address must be specified')
      .custom(value => notEmpty(value, 'Delivery Address field cannot be left blank'))
      .isLength({ min: 5, max: 255 })
      .withMessage('Text must be between 5 and 255 characters')
      .matches(/^[a-z 0-9 (),.'-]+$/i)
      .withMessage('Text can only contain letters and the characters (,.\'-)'),
    check('deliveryPhoneNo')
      .trim()
      .exists().withMessage('Delivery Phone Number must be specified')
      .custom(value => notEmpty(value, 'Delivery Phone Number field cannot be left blank'))
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
      .optional()
      .custom(value => notEmpty(value, 'If provided, meals field cannot be left blank'))
      .custom(value => Array.isArray(value))
      .withMessage('Meals must be an array of Meal Ids')
      .custom(value => checkOrderMeals(value))
      .custom(value => checkOrderMealsId(value))
      .custom(value => checkOrderQuantity(value))
      .custom(value => isValidOrderItems(value)),
    check('status')
      .trim()
      .optional()
      .custom(value => notEmpty(value, 'If provided, status field cannot be left blank'))
      .isIn(['pending', 'canceled'])
      .withMessage('Accepts only pending or canceled'),
    check('deliveryAddress')
      .trim()
      .optional()
      .custom(value => notEmpty(value, 'If provided, delivery address field cannot be left blank'))
      .isLength({ min: 5, max: 255 })
      .withMessage('Text must be between 5 and 255 characters')
      .matches(/^[a-z 0-9 (),.'-]+$/i)
      .withMessage('Text can only contain letters and the characters (,.\'-)'),
    check('deliveryPhoneNo')
      .trim()
      .optional()
      .custom(value => notEmpty(value, 'If provided, delivery phone number field cannot be left blank'))
      .matches(/^\+?(234)([0-9]{10})$/)
      .withMessage('Delivery Phone Number must be in the format +2348134567890')
      .isLength({ min: 10, max: 15 })
      .withMessage('Delivery Phone Number must be between 5 and 15 characters'),
  ],
  delete: [
    check('orderId')
      .isUUID(4)
      .withMessage('Invalid ID')
  ]
};

