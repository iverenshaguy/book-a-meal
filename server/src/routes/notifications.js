import express from 'express';
import asyncWrapper from '../helpers/asyncWrapper';
import Notifications from '../controllers/Notifications';
import Authorization from '../middlewares/Authorization';

const notificationsRoutes = express.Router();

notificationsRoutes.get('/', Authorization.authorize, asyncWrapper(Notifications.getNotifications));


export default notificationsRoutes;
