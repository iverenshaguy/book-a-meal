import express from 'express';
import menuRoutes from './menu';
import authRoutes from './auth';
import mealsRoutes from './meals';
import ordersRoutes from './orders';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to the Book A Meal API',
  v1: '/api/v1'
}));

apiRoutes.get('/v1', (req, res) => res.status(200).json({
  message: 'Welcome to version 1 of the Book A Meal API'
}));

apiRoutes.use('/v1/menu', menuRoutes);
apiRoutes.use('/v1/auth', authRoutes);
apiRoutes.use('/v1/meals', mealsRoutes);
apiRoutes.use('/v1/orders', ordersRoutes);

export default apiRoutes;
