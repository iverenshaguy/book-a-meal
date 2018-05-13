import { check } from 'express-validator/check';
import db from '../models';
import notEmpty from '../helpers/notEmpty';

export default {
  create: [
    check('title')
      .trim()
      .exists().withMessage('Title must be specified')
      .custom(value => notEmpty(value, 'Title cannot be empty'))
      .isLength({ min: 1, max: 50 })
      .withMessage('Title must be between 1 and 50 characters')
      .matches(/^[a-z (),.'-]+$/i)
      .withMessage('Title can only contain letters and the characters (,.\'-)')
      .custom(async (value, { req }) => {
        const checkMeal = await db.Meal.findOne({ where: { title: value, userId: req.userId } });
        if (checkMeal) {
          throw new Error('Meal already exists');
        }

        return true;
      }),
    check('description')
      .trim()
      .optional({ checkFalsy: true })
      .isLength({ max: 255 })
      .withMessage('Text must not be more than 255 characters')
      .matches(/^[a-z 0-9 (),.'-]+$/i)
      .withMessage('Text can only contain letters and the characters (,.\'-)'),
    check('price')
      .trim()
      .exists().withMessage('Price must be specified')
      .custom(value => notEmpty(value, 'Price cannot be empty'))
      .isDecimal()
      .withMessage('Price must be a number')
      .custom(value => value >= 50)
      .withMessage('Price must be greater than or equal to 50'),
    check('imageURL')
      .trim()
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage('imageURL must be a url'),
    check('forVegetarians')
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
      .optional()
      .custom(value => notEmpty(value, 'Title cannot be empty'))
      .isLength({ min: 1, max: 50 })
      .withMessage('Title must be between 1 and 50 characters')
      .matches(/^[a-z (),.'-]+$/i)
      .withMessage('Title can only contain letters and the characters (,.\'-)')
      .custom(async (value, { req }) => {
        const checkMeal = await db.Meal.findOne({ where: { title: value, userId: req.userId } });
        if (checkMeal) {
          throw new Error('Meal already exists');
        }

        return true;
      }),
    check('description')
      .trim()
      .optional({ checkFalsy: true })
      .isLength({ max: 255 })
      .withMessage('Text must not be more than 255 characters')
      .matches(/^[a-z 0-9 (),.'-]+$/i)
      .withMessage('Text can only contain letters and the characters (,.\'-)'),
    check('price')
      .trim()
      .optional()
      .custom(value => notEmpty(value, 'Price cannot be empty'))
      .isDecimal()
      .withMessage('Price must be a number')
      .custom(value => value >= 50)
      .withMessage('Price must be greater than or equal to 50'),
    check('imageURL')
      .trim()
      .optional({ checkFalsy: true })
      .isURL()
      .withMessage('imageURL must be a url'),
    check('forVegetarians')
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

