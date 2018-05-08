import express from 'express';
import Meals from '../controllers/Meals';
import mealsValidation from '../validations/meals';
import asyncWrapper from '../helpers/asyncWrapper';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const mealsRoutes = express.Router();
const authorization = new Authorization('caterer');

mealsRoutes.use(Authorization.authorize, authorization.authorizeRole);

mealsRoutes.get('/', asyncWrapper(Meals.getMeals));
mealsRoutes.post('/', mealsValidation.create, ValidationHandler.validate, asyncWrapper(Meals.create));
mealsRoutes.put('/:mealId', mealsValidation.update, ValidationHandler.validate, asyncWrapper(Meals.update));
mealsRoutes.delete('/:mealId', mealsValidation.delete, ValidationHandler.validate, asyncWrapper(Meals.delete));

export default mealsRoutes;
