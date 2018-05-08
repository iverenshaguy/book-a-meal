import express from 'express';
import Orders from '../controllers/Orders';
import ordersValidation from '../validations/orders';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const ordersRoutes = express.Router();
const authorization = new Authorization('user');

ordersRoutes.use(Authorization.authorize, authorization.authorizeRole);

ordersRoutes.get('/', Orders.getOrders);
ordersRoutes.post('/', ordersValidation.create, ValidationHandler.validate, Orders.create);
ordersRoutes.put('/:orderId', ordersValidation.update, ValidationHandler.validate, Orders.update);
ordersRoutes.delete('/:orderId', ordersValidation.delete, ValidationHandler.validate, Orders.delete);

export default ordersRoutes;
