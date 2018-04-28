import express from 'express';
import Orders from '../controllers/Orders';
import ordersDB from '../../data/orders.json';
import ordersValidation from '../validations/orders';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const ordersRoutes = express.Router();
const ordersController = new Orders(ordersDB, 'order');

ordersRoutes.get(
  '/',
  (req, res, next) => Authorization.authorizeAny(req, res, next, Orders.list)
);

ordersRoutes.post(
  '/', Authorization.authorizeUser, ordersValidation.create,
  (req, res) => ValidationHandler.validate(req, res, ordersController.create)
);

ordersRoutes.put(
  '/:orderId', Authorization.authorizeUser, ordersValidation.update,
  (req, res) => ValidationHandler.validate(req, res, ordersController.update)
);

ordersRoutes.delete(
  '/:orderId', Authorization.authorizeUser, ordersValidation.delete,
  (req, res) => ValidationHandler.validate(req, res, ordersController.delete)
);

export default ordersRoutes;
