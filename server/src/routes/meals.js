import express from 'express';
import Meals from '../controllers/Meals';
import mealsValidation from '../validations/meals';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const mealsRoutes = express.Router();

mealsRoutes.get('/', Authorization.authorizeCaterer, (req, res) => Meals.list(req, res));
mealsRoutes.post(
  '/', Authorization.authorizeCaterer, mealsValidation.create,
  (req, res) => ValidationHandler.validate(req, res, Meals.create)
);

export default mealsRoutes;
