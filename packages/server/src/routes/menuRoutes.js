import express from 'express';
import MenuController from '../controllers/MenuController';
import asyncWrapper from '../helpers/asyncWrapper';
import menuValidation from '../validations/menuValidation';
import Authorization from '../middlewares/Authorization';
import ValidationHandler from '../middlewares/ValidationHandler';
import TrimValues from '../middlewares/TrimValues';

const menuRoutes = express.Router();
const authorization = new Authorization('caterer');
const validation = [ValidationHandler.validate, TrimValues.trim];
const reqBodyValidation = [...validation, ValidationHandler.isEmptyReq];


menuRoutes.use(Authorization.authorize);

menuRoutes.get('/', menuValidation.getMenu, validation, asyncWrapper(MenuController.getMenuForDay));

menuRoutes.use(authorization.authorizeRole);

menuRoutes.post('/', menuValidation.createMenu, reqBodyValidation, asyncWrapper(MenuController.createMenu));
menuRoutes.put('/:menuId', menuValidation.updateMenu, reqBodyValidation, asyncWrapper(MenuController.updateMenu));

export default menuRoutes;
