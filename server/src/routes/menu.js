import express from 'express';
import Menu from '../controllers/Menu';
import asyncWrapper from '../helpers/asyncWrapper';
import menuValidation from '../validations/menu';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';

const menuRoutes = express.Router();
const authorization = new Authorization('caterer');

menuRoutes.use(Authorization.authorize, authorization.authorizeRole);

menuRoutes.get('/', asyncWrapper(Menu.getMenuForDay));
menuRoutes.post('/', menuValidation.create, ValidationHandler.validate, asyncWrapper(Menu.create));
menuRoutes.put('/:menuId', menuValidation.update, ValidationHandler.validate, asyncWrapper(Menu.update));

export default menuRoutes;
