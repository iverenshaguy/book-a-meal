import express from 'express';
import Meals from '../controllers/Meals';
import Authorization from '../middlewares/Authorization';

const mealsRoutes = express.Router();

mealsRoutes.get('/', Authorization.authorizeCaterer, (req, res) => Meals.list(req, res));

export default mealsRoutes;
