import express from 'express';
import OrderController from '../controllers/OrderController';
import asyncWrapper from '../helpers/asyncWrapper';
import orderValidation from '../validations/orderValidation';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';
import TrimValues from '../middlewares/TrimValues';

const orderRoutes = express.Router();
const userAuth = new Authorization('customer').authorizeRole;
const catererAuth = new Authorization('caterer').authorizeRole;
const validation = [ValidationHandler.validate, TrimValues.trim];
const reqBodyValidation = [...validation, ValidationHandler.isEmptyReq];

orderRoutes.use(Authorization.authorize);

orderRoutes.get('/', orderValidation.getOrders, validation, asyncWrapper(OrderController.getOrders));
orderRoutes.get('/:orderId', orderValidation.getSingleOrder, validation, asyncWrapper(OrderController.getSingleOrder));
orderRoutes.post('/:orderId/deliver', catererAuth, orderValidation.deliverOrder, reqBodyValidation, asyncWrapper(OrderController.deliverOrder));

orderRoutes.use(userAuth);

orderRoutes.post('/', ValidationHandler.isShopOpen, orderValidation.createOrder, reqBodyValidation, asyncWrapper(OrderController.createOrder));
orderRoutes.put('/:orderId', orderValidation.updateOrder, reqBodyValidation, asyncWrapper(OrderController.checkOrderStatus), asyncWrapper(OrderController.updateOrder));

export default orderRoutes;
