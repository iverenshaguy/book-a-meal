import express from 'express';
import Meals from '../controllers/Meals';
import mealsDB from '../data/meals.json';
import mealsValidation from '../validations/meals';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const mealsRoutes = express.Router();
const mealsController = new Meals(mealsDB, 'meal');
const authorization = new Authorization('caterer');

mealsRoutes.get('/', authorization.authorize, (req, res) => mealsController.list(req, res));
mealsRoutes.post(
  '/', authorization.authorize, mealsValidation.create,
  (req, res) => ValidationHandler.validate(req, res, mealsController.create)
);
mealsRoutes.put(
  '/:mealId', authorization.authorize, mealsValidation.update,
  (req, res) => ValidationHandler.validate(req, res, mealsController.update)
);
mealsRoutes.delete(
  '/:mealId', authorization.authorize, mealsValidation.delete,
  (req, res) => ValidationHandler.validate(req, res, mealsController.delete)
);

export default mealsRoutes;
