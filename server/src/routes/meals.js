import express from 'express';
import Meals from '../controllers/Meals';
import asyncWrapper from '../helpers/asyncWrapper';
import mealsValidation from '../validations/meals';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';
import TrimValues from '../middlewares/TrimValues';

const mealsRoutes = express.Router();
const authorization = new Authorization('caterer');
const validation = [ValidationHandler.validate, TrimValues.trim, ValidationHandler.isEmptyReq];

mealsRoutes.use(Authorization.authorize, authorization.authorizeRole);

mealsRoutes.get('/', mealsValidation.get, ValidationHandler.validate, asyncWrapper(Meals.getMeals));
mealsRoutes.post('/', mealsValidation.create, validation, asyncWrapper(Meals.create));
mealsRoutes.put('/:mealId', mealsValidation.update, validation, asyncWrapper(Meals.update));
mealsRoutes.delete('/:mealId', mealsValidation.delete, ValidationHandler.validate, asyncWrapper(Meals.delete));

export default mealsRoutes;
