import express from 'express';
import Notifications from '../controllers/Notifications';
import Authorization from '../middlewares/Authorization';

const notificationsRoutes = express.Router();

notificationsRoutes.get(
  '/',
  (req, res, next) => Authorization.authorizeAny(req, res, next, Notifications.list)
);


export default notificationsRoutes;
