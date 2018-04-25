import express from 'express';
import Meals from '../controllers/Meals';

const mealsRoutes = express.Router();

mealsRoutes.get('/', (req, res) => Meals.list(req, res));

export default mealsRoutes;
