import express from 'express';
import Orders from '../controllers/Orders';
import asyncWrapper from '../helpers/asyncWrapper';
import ordersValidation from '../validations/orders';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';
import TrimValues from '../middlewares/TrimValues';

const ordersRoutes = express.Router();
const userAuth = new Authorization('user').authorizeRole;
const catererAuth = new Authorization('caterer').authorizeRole;
const validation = [ValidationHandler.validate, TrimValues.trim, ValidationHandler.isEmptyReq];

ordersRoutes.use(Authorization.authorize);

ordersRoutes.get('/', asyncWrapper(Orders.getOrders));
ordersRoutes.post('/:orderId/deliver', catererAuth, ordersValidation.deliver, validation, asyncWrapper(Orders.deliver));

ordersRoutes.use(userAuth);

ordersRoutes.post('/', ValidationHandler.isShopOpen, ordersValidation.create, validation, asyncWrapper(Orders.create));
ordersRoutes.put('/:orderId', ordersValidation.update, validation, asyncWrapper(Orders.update));

export default ordersRoutes;
