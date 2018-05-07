import express from 'express';
import Menu from '../controllers/Menu';
import menuValidation from '../validations/menu';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const menuRoutes = express.Router();
const authorization = new Authorization('caterer');

menuRoutes.post(
  '/', Authorization.authorize, authorization.authorizeRole,
  menuValidation.create, ValidationHandler.validate, Menu.create
);

menuRoutes.get('/', Menu.getMenuForDay);

menuRoutes.put(
  '/:menuId', Authorization.authorize, authorization.authorizeRole,
  menuValidation.update, ValidationHandler.validate, Menu.update
);

export default menuRoutes;
