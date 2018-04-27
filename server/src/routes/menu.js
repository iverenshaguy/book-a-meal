import express from 'express';
import Menu from '../controllers/Menu';
import menuDB from '../data/menu.json';
import menuValidation from '../validations/menu';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const menuRoutes = express.Router();
const menuController = new Menu(menuDB, 'menu');
const authorization = new Authorization('caterer');

menuRoutes.post(
  '/', authorization.authorize, menuValidation.create,
  (req, res) => ValidationHandler.validate(req, res, menuController.create)
);

menuRoutes.get('/', (req, res) => menuController.getMenuForDay(req, res));

menuRoutes.put(
  '/:menuId', authorization.authorize, menuValidation.update,
  (req, res) => ValidationHandler.validate(req, res, menuController.update)
);

export default menuRoutes;
