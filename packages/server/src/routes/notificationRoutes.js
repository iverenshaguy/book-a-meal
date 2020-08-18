import express from 'express';
import NotificationController from '../controllers/NotificationController';
import asyncWrapper from '../helpers/asyncWrapper';
import Authorization from '../middlewares/Authorization';

const notificationRoutes = express.Router();

notificationRoutes.use(Authorization.authorize);

notificationRoutes.get('/', asyncWrapper(NotificationController.getNotifications));

export default notificationRoutes;
