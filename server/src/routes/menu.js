import express from 'express';
import Menu from '../controllers/Menu';
import asyncWrapper from '../helpers/asyncWrapper';
import menuValidation from '../validations/menu';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';
import TrimValues from '../middlewares/TrimValues';

const menuRoutes = express.Router();
const authorization = new Authorization('caterer');
const validation = [ValidationHandler.validate, TrimValues.trim];


menuRoutes.use(Authorization.authorize);

menuRoutes.get('/', asyncWrapper(Menu.getMenuForDay));

menuRoutes.use(authorization.authorizeRole);

menuRoutes.post('/', menuValidation.create, validation, asyncWrapper(Menu.create));
menuRoutes.put('/:menuId', menuValidation.update, validation, asyncWrapper(Menu.update));

export default menuRoutes;
