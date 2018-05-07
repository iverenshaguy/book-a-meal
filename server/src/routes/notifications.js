import express from 'express';
import Notifications from '../controllers/Notifications';
import Authorization from '../middlewares/Authorization';

const notificationsRoutes = express.Router();

notificationsRoutes.get('/', Authorization.authorize, Notifications.getNotifications);


export default notificationsRoutes;
