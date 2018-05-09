import { check } from 'express-validator/check';
import moment from 'moment';
import notEmpty from '../helpers/notEmpty';
import isUsersMeal from '../helpers/isUsersMeal';
import checkMealsId from '../helpers/checkMealsId';

const yesterday = moment().subtract(1, 'days').format().toString();

export default {
  create: [
    check('date')
      .trim()
      .optional({ checkFalsy: true })
      .custom(value => notEmpty(value, 'Date cannot be empty'))
      .matches(/^\d{4}-\d{1,2}-\d{1,2}$/)
      .withMessage('Date is invalid, valid format is YYYY-MM-DD')
      .isAfter(yesterday)
      .withMessage('Date must be either today or in the future'),
    check('meals')
      .exists()
      .withMessage('Meals must be specified')
      .custom(value => notEmpty(value, 'Meals cannot be empty'))
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
      .custom(value => notEmpty(value, 'Meals cannot be empty'))
      .custom(value => checkMealsId(value))
      .custom(async (value, { req }) => {
        await isUsersMeal(value, req.userId).then(err => err);
      }),
  ],
};
