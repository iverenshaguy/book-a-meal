import express from 'express';
import authRoutes from './auth';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Book A Meal API',
}));

apiRoutes.get('/v1', (req, res) => res.status(200).send({
  message: 'Welcome to version 1 of the Book A Meal API',
}));

apiRoutes.use('/v1/auth', authRoutes);

export default apiRoutes;
