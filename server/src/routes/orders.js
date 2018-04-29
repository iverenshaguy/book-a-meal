import express from 'express';
import Orders from '../controllers/Orders';
import ordersDB from '../dummyData/orders';
import ordersValidation from '../validations/orders';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const ordersRoutes = express.Router();
const ordersController = new Orders(ordersDB, 'order');
const authorization = new Authorization('user');

ordersRoutes.post(
  '/', authorization.authorize, ordersValidation.create,
  (req, res) => ValidationHandler.validate(req, res, ordersController.create)
);

export default ordersRoutes;
