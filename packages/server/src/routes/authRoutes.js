import express from 'express';
import asyncWrapper from '../helpers/asyncWrapper';
import authValidation from '../validations/authValidation';
import Authorization from '../middlewares/Authorization';
import UserController from '../controllers/UserController';
import ValidationHandler from '../middlewares/ValidationHandler';
import TrimValues from '../middlewares/TrimValues';

const authRoutes = express.Router();
const validation = [ValidationHandler.validate, TrimValues.trim, ValidationHandler.isEmptyReq];


authRoutes.post('/signup', authValidation.register, validation, asyncWrapper(UserController.register));
authRoutes.post('/signin', authValidation.login, validation, asyncWrapper(UserController.login));
authRoutes.post('/forgot_password', authValidation.forgotPassword, validation, asyncWrapper(UserController.forgotPassword));
authRoutes.post('/reset_password', authValidation.resetPassword, validation, asyncWrapper(UserController.resetPassword));
authRoutes.get('/refresh_token', Authorization.authorize, asyncWrapper(Authorization.refreshToken));

export default authRoutes;
