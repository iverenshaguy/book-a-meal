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
const reqBodyValidation = [...validation, ValidationHandler.isEmptyReq];


menuRoutes.use(Authorization.authorize);

menuRoutes.get('/', menuValidation.retrieve, validation, asyncWrapper(Menu.getMenuForDay));

menuRoutes.use(authorization.authorizeRole);

menuRoutes.post('/', menuValidation.create, reqBodyValidation, asyncWrapper(Menu.create));
menuRoutes.put('/:menuId', menuValidation.update, reqBodyValidation, asyncWrapper(Menu.update));

export default menuRoutes;
