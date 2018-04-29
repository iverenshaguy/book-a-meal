import { check } from 'express-validator/check';
import mealsDB from '../dummyData/meals';
import notEmpty from '../helpers/notEmpty';

export default {
  create: [
    check('title')
      .trim()
      .exists().withMessage('Title must be specified')
      .custom(value => notEmpty(value, 'Title cannot be empty'))
      .isLength({ max: 50 })
      .withMessage('Title must not be more than 50 characters')
      .matches(/^[a-z (),.'-]+$/i)
      .withMessage('Title can only contain letters and the characters (,.\'-)')
      .custom((value) => {
        const checkMeal = mealsDB.find(meal => meal.title.toLowerCase() === value.toLowerCase());
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
      .matches(/^[a-z (),.'-]+$/i)
      .withMessage('Text can only contain letters and the characters (,.\'-)'),
    check('price')
      .trim()
      .exists().withMessage('Price must be specified')
      .custom(value => notEmpty(value, 'Price cannot be empty'))
      .isInt()
      .withMessage('Price must be a number')
      .isLength({ max: 5 })
      .withMessage('Price must not be more than 5 characters'),
    check('image')
      .trim()
      .optional({ checkFalsy: true }),
    check('forVegetarians')
      .trim()
      .optional({ checkFalsy: true })
      .isIn([false, true])
      .withMessage('Accepts only true or false'),
  ],
  update: [
    check('title')
      .trim()
      .custom(value => notEmpty(value, 'Title cannot be empty'))
      .isLength({ max: 50 })
      .withMessage('Title must not be more than 50 characters')
      .matches(/^[a-z (),.'-]+$/i)
      .withMessage('Title can only contain letters and the characters (,.\'-)'),
    check('description')
      .trim()
      .optional({ checkFalsy: true })
      .isLength({ max: 255 })
      .withMessage('Text must not be more than 255 characters')
      .matches(/^[a-z (),.'-]+$/i)
      .withMessage('Text can only contain letters and the characters (,.\'-)'),
    check('price')
      .trim()
      .custom(value => notEmpty(value, 'Price cannot be empty'))
      .isInt()
      .withMessage('Price must be a number')
      .isLength({ max: 5 })
      .withMessage('Price must not be more than 5 characters'),
    check('image')
      .trim()
      .optional({ checkFalsy: true }),
    check('forVegetarians')
      .trim()
      .optional({ checkFalsy: true })
      .isIn([false, true])
      .withMessage('Accepts only true or false'),
  ],
};

