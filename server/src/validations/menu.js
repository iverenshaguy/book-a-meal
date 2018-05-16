import { check } from 'express-validator/check';
import moment from 'moment';
import notEmpty from '../helpers/notEmpty';
import validateDate from '../helpers/validateDate';
import isUsersMeal from '../helpers/isUsersMeal';
import checkMealsId from '../helpers/checkMealsId';

const yesterday = moment().subtract(1, 'days').format().toString();

export default {
  create: [
    check('date')
      .trim()
      .optional({ checkFalsy: true })
      .custom(value => notEmpty(value, 'Date field cannot be left blank'))
      .custom(value => validateDate(value))
      .isAfter(yesterday)
      .withMessage('Date must be either today or in the future'),
    check('meals')
      .exists()
      .withMessage('Meals must be specified')
      .custom(value => notEmpty(value, 'Meals field cannot be left blank'))
      .custom(value => Array.isArray(value))
      .withMessage('Meals must be an array of Meal Ids')
      .custom(value => checkMealsId(value))
      .custom(async (value, { req }) => {
        await isUsersMeal(value, req.userId).then(err => err);
      }),
  ],
  update: [
    check('menuId')
      .isUUID(4)
      .withMessage('Invalid ID'),
    check('date')
      .custom(value => !value)
      .withMessage('Menu dates cannot be changed'),
    check('meals')
      .optional()
      .custom(value => notEmpty(value, 'If provided, meals field cannot be left blank'))
      .custom(value => Array.isArray(value))
      .withMessage('Meals must be an array of Meal Ids')
      .custom(value => checkMealsId(value))
      .custom(async (value, { req }) => {
        await isUsersMeal(value, req.userId).then(err => err);
      }),
  ],
};
