import express from 'express';
import Meals from '../controllers/Meals';
import mealsValidation from '../validations/meals';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const mealsRoutes = express.Router();
const authorization = new Authorization('caterer');

mealsRoutes.use(Authorization.authorize, authorization.authorizeRole);

mealsRoutes.get('/', Meals.getMeals);
mealsRoutes.post('/', mealsValidation.create, ValidationHandler.validate, Meals.create);
mealsRoutes.put('/:mealId', mealsValidation.update, ValidationHandler.validate, Meals.update);
mealsRoutes.delete('/:mealId', mealsValidation.delete, ValidationHandler.validate, Meals.delete);

export default mealsRoutes;
