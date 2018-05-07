import express from 'express';
import Meals from '../controllers/Meals';
import mealsValidation from '../validations/meals';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const mealsRoutes = express.Router();
const authorization = new Authorization('caterer');

mealsRoutes.get('/', Authorization.authorize, authorization.authorizeRole, Meals.list);

mealsRoutes.post(
  '/', Authorization.authorize, authorization.authorizeRole,
  mealsValidation.create, ValidationHandler.validate, Meals.create
);

mealsRoutes.put(
  '/:mealId', Authorization.authorize, authorization.authorizeRole,
  mealsValidation.update, ValidationHandler.validate, Meals.update
);

mealsRoutes.delete(
  '/:mealId', Authorization.authorize, authorization.authorizeRole,
  mealsValidation.delete, ValidationHandler.validate, Meals.delete
);

export default mealsRoutes;
