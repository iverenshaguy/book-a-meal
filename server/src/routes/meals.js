import express from 'express';
import Meals from '../controllers/Meals';
import mealsDB from '../data/meals.json';
import mealsValidation from '../validations/meals';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const mealsRoutes = express.Router();
const mealsController = new Meals(mealsDB, 'meal');

mealsRoutes.get('/', Authorization.authorizeCaterer, (req, res) => mealsController.list(req, res));
mealsRoutes.post(
  '/', Authorization.authorizeCaterer, mealsValidation.create,
  (req, res) => ValidationHandler.validate(req, res, mealsController.create)
);
mealsRoutes.put(
  '/:mealId', Authorization.authorizeCaterer, mealsValidation.update,
  (req, res) => ValidationHandler.validate(req, res, mealsController.update)
);
mealsRoutes.delete(
  '/:mealId', Authorization.authorizeCaterer, mealsValidation.delete,
  (req, res) => ValidationHandler.validate(req, res, mealsController.delete)
);

export default mealsRoutes;
