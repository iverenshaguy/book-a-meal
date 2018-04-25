import express from 'express';
import Meals from '../controllers/Meals';

const mealsRoutes = express.Router();

mealsRoutes.get('/', (req, res, next) => Meals.list(req, res, next));

export default mealsRoutes;
