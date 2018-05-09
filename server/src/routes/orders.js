import express from 'express';
import Orders from '../controllers/Orders';
import asyncWrapper from '../helpers/asyncWrapper';
import ordersValidation from '../validations/orders';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';
import OrderValidationHandler from '../middlewares/OrderValidationHandler';

const ordersRoutes = express.Router();
const authorization = new Authorization('user');

ordersRoutes.use(Authorization.authorize, authorization.authorizeRole);

ordersRoutes.get('/', asyncWrapper(Orders.getOrders));
ordersRoutes.post(
  '/', ordersValidation.create, OrderValidationHandler.isShopOpen,
  ValidationHandler.validate, asyncWrapper(Orders.create)
);
ordersRoutes.put('/:orderId', ordersValidation.update, ValidationHandler.validate, asyncWrapper(Orders.update));
ordersRoutes.delete('/:orderId', ordersValidation.delete, ValidationHandler.validate, asyncWrapper(Orders.delete));

export default ordersRoutes;
