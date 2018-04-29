import express from 'express';
import UsersController from '../controllers/Users';
import Authorization from '../middlewares/Authorization';

const usersRoutes = express.Router();
const authorization = new Authorization('user');


usersRoutes.get(
  '/:userId/orders',
  authorization.authorize, (req, res) => UsersController.getOrders(req, res)
);

export default usersRoutes;
