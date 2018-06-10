import { check } from 'express-validator/check';
import notEmpty from '../helpers/notEmpty';

export default {
  create: [
    check('title')
      .trim()
      .customSanitizer(value => value.replace(/  +/g, ' ').trim())
      .exists()
      .withMessage('Meal title must be specified')
      .custom(value => notEmpty(value, 'Meal title field cannot be left blank'))
      .isLength({ min: 1, max: 50 })
      .withMessage('Meal title must be between 1 and 50 characters')
      .matches(/^[a-z (),.'-]+$/i)
      .withMessage('Meal title can only contain letters and the characters (,.\'-)'),
    check('description')
      .trim()
      .optional({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage('Text must not be more than 50 characters')
      .matches(/^[a-z 0-9 (),.'-]+$/i)
      .withMessage('Text can only contain letters and the characters (,.\'-)'),
    check('price')
      .trim()
      .exists().withMessage('Price must be specified')
      .custom(value => notEmpty(value, 'Price field cannot be left blank'))
      .isDecimal()
      .withMessage('Price must be a number or decimal')
      .custom(value => parseFloat(value).toFixed(2) > 0)
      .withMessage('Price must be greater than 0'),
    check('imageURL')
      .trim()
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage('imageURL must be a url'),
    check('vegetarian')
      .trim()
      .optional({ checkFalsy: true })
      .isIn([false, true])
      .withMessage('Accepts only true or false'),
  ],
  update: [
    check('mealId')
      .isUUID(4)
      .withMessage('Invalid ID'),
    check('title')
      .trim()
      .customSanitizer(value => value.replace(/  +/g, ' ').trim())
      .optional()
      .custom(value => notEmpty(value, 'If provided, meal title field cannot be left blank'))
      .isLength({ min: 1, max: 50 })
      .withMessage('Meal title must be between 1 and 50 characters')
      .matches(/^[a-z (),.'-]+$/i)
      .withMessage('Meal title can only contain letters and the characters (,.\'-)'),
    check('description')
      .trim()
      .optional({ checkFalsy: true })
      .isLength({ max: 50 })
      .withMessage('Text must not be more than 50 characters')
      .matches(/^[a-z 0-9 (),.'-]+$/i)
      .withMessage('Text can only contain letters and the characters (,.\'-)'),
    check('price')
      .trim()
      .optional()
      .custom(value => notEmpty(value, 'If provided, price field cannot be left blank'))
      .isDecimal()
      .withMessage('Price must be a number or decimal')
      .custom(value => parseFloat(value).toFixed(2) > 0)
      .withMessage('Price must be greater than 0'),
    check('imageURL')
      .trim()
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage('imageURL must be a url'),
    check('vegetarian')
      .trim()
      .optional({ checkFalsy: true })
      .isIn([false, true])
      .withMessage('Accepts only true or false'),
  ],
  delete: [
    check('mealId')
      .isUUID(4)
      .withMessage('Invalid ID'),
  ]
};

