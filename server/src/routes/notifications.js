import express from 'express';
import Notifications from '../controllers/Notifications';
import asyncWrapper from '../helpers/asyncWrapper';
import Authorization from '../middlewares/Authorization';

const notificationsRoutes = express.Router();

notificationsRoutes.use(Authorization.authorize);

notificationsRoutes.get('/', asyncWrapper(Notifications.getNotifications));

export default notificationsRoutes;
