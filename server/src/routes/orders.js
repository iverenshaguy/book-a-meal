import express from 'express';
import Orders from '../controllers/Orders';
import ordersValidation from '../validations/orders';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const ordersRoutes = express.Router();
const authorization = new Authorization('user');

ordersRoutes.get('/', Authorization.authorize, Orders.list);

ordersRoutes.post(
  '/', Authorization.authorize, authorization.authorizeRole,
  ordersValidation.create, ValidationHandler.validate, Orders.create
);

ordersRoutes.put(
  '/:orderId', Authorization.authorize, authorization.authorizeRole,
  ordersValidation.update, ValidationHandler.validate, Orders.update
);

ordersRoutes.delete(
  '/:orderId', Authorization.authorize, authorization.authorizeRole,
  ordersValidation.delete, ValidationHandler.validate, Orders.delete
);

export default ordersRoutes;
