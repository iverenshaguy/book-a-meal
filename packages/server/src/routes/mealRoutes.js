import express from 'express';
import MealController from '../controllers/MealController';
import asyncWrapper from '../helpers/asyncWrapper';
import mealValidation from '../validations/mealValidation';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';
import TrimValues from '../middlewares/TrimValues';

const mealRoutes = express.Router();
const authorization = new Authorization('caterer');
const validation = [ValidationHandler.validate, TrimValues.trim, ValidationHandler.isEmptyReq];

mealRoutes.use(Authorization.authorize, authorization.authorizeRole);

mealRoutes.get('/', mealValidation.getMeals, ValidationHandler.validate, asyncWrapper(MealController.getMeals));
mealRoutes.post('/', mealValidation.createMeal, validation, asyncWrapper(MealController.createMeal));
mealRoutes.put('/:mealId', mealValidation.updateMeal, validation, asyncWrapper(MealController.updateMeal));
mealRoutes.delete('/:mealId', mealValidation.deleteMeal, ValidationHandler.validate, asyncWrapper(MealController.deleteMeal));

export default mealRoutes;
