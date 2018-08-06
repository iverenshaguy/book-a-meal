import express from 'express';
import Orders from '../controllers/Orders';
import asyncWrapper from '../helpers/asyncWrapper';
import ordersValidation from '../validations/orders';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';
import TrimValues from '../middlewares/TrimValues';

const ordersRoutes = express.Router();
const userAuth = new Authorization('customer').authorizeRole;
const catererAuth = new Authorization('caterer').authorizeRole;
const validation = [ValidationHandler.validate, TrimValues.trim];
const reqBodyValidation = [...validation, ValidationHandler.isEmptyReq];

ordersRoutes.use(Authorization.authorize);

ordersRoutes.get('/', ordersValidation.retrieve, validation, asyncWrapper(Orders.getOrders));
ordersRoutes.get('/:orderId', ordersValidation.retrieveOne, validation, asyncWrapper(Orders.getSingleOrder));
ordersRoutes.post('/:orderId/deliver', catererAuth, ordersValidation.deliver, reqBodyValidation, asyncWrapper(Orders.deliver));

ordersRoutes.use(userAuth);

ordersRoutes.post('/', ValidationHandler.isShopOpen, ordersValidation.create, reqBodyValidation, asyncWrapper(Orders.create));
ordersRoutes.put('/:orderId', ordersValidation.update, reqBodyValidation, asyncWrapper(Orders.checkOrderStatus), asyncWrapper(Orders.update));

export default ordersRoutes;
