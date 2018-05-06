import express from 'express';
import Menu from '../controllers/Menu';
import menuValidation from '../validations/menu';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const menuRoutes = express.Router();
const authorization = new Authorization('caterer');

menuRoutes.use(Authorization.authorize, authorization.authorizeRole);

menuRoutes.get('/', Menu.getMenuForDay);
menuRoutes.post('/', menuValidation.create, ValidationHandler.validate, Menu.create);
menuRoutes.put('/:menuId', menuValidation.update, ValidationHandler.validate, Menu.update);

export default menuRoutes;
