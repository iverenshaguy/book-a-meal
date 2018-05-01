import { check } from 'express-validator/check';
import moment from 'moment';
// import menuDB from '../../data/menu.json';
import notEmpty from '../helpers/notEmpty';
import isUsersMeal from '../helpers/isUsersMeal';
import checkMealsId from '../helpers/checkMealsId';
import checkMenuUnique from '../helpers/checkMenuUnique';

const yesterday = moment().subtract(1, 'days').format().toString();

export default {
  create: [
    check('date')
      .trim()
      .optional({ checkFalsy: true })
      .custom(value => notEmpty(value, 'Date cannot be empty'))
      .custom((value, { req }) => checkMenuUnique(value, req.body.userId))
      .withMessage('Menu already exists for this day')
      .matches(/^\d{4}-\d{1,2}-\d{1,2}$/)
      .withMessage('Date is invalid, valid format is YYYY-MM-DD')
      .isAfter(yesterday)
      .withMessage('Date must be either today or in the future'),
    check('meals')
      .exists()
      .withMessage('Meals must be specified')
      .custom(value => notEmpty(value, 'Meals cannot be empty'))
      .custom(value => checkMealsId(value))
      .custom((value, { req }) => isUsersMeal(value, req.body.userId)),
  ],
  update: [
    check('menuId')
      .isUUID(4)
      .withMessage('Invalid ID'),
    check('meals')
      .optional()
      .custom(value => notEmpty(value, 'Meals cannot be empty'))
      .custom(value => checkMealsId(value))
      .custom((value, { req }) => isUsersMeal(value, req.body.userId)),
  ],
};
