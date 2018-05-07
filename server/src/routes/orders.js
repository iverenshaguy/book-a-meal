import express from 'express';
import Orders from '../controllers/Orders';
import ordersValidation from '../validations/orders';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const ordersRoutes = express.Router();
const authorization = new Authorization('user');

ordersRoutes.get('/', Authorization.authorize, Orders.list);

ordersRoutes.post(
  '/', Authorization.authorize, authorization.authorizeRole, ordersValidation.create,
  (req, res) => ValidationHandler.validate(req, res, Orders.create)
);

ordersRoutes.put(
  '/:orderId', Authorization.authorize, authorization.authorizeRole, ordersValidation.update,
  (req, res) => ValidationHandler.validate(req, res, Orders.update)
);

ordersRoutes.delete(
  '/:orderId', Authorization.authorize, authorization.authorizeRole, ordersValidation.delete,
  (req, res) => ValidationHandler.validate(req, res, Orders.delete)
);

export default ordersRoutes;
