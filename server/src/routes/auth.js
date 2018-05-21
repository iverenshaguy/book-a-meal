import express from 'express';
import asyncWrapper from '../helpers/asyncWrapper';
import authValidation from '../validations/auth';
import UsersController from '../controllers/Users';
import ValidationHandler from '../middlewares/ValidationHandler';
import TrimValues from '../middlewares/TrimValues';

const authRoutes = express.Router();
const validation = [ValidationHandler.validate, TrimValues.trim, ValidationHandler.isEmptyReq];


authRoutes.post('/signup', authValidation.register, validation, asyncWrapper(UsersController.register));
authRoutes.post('/signin', authValidation.login, validation, asyncWrapper(UsersController.login));
authRoutes.post('/forgot_password', authValidation.forgotPassword, validation, asyncWrapper(UsersController.forgotPassword));
authRoutes.post('/reset_password', authValidation.resetPassword, validation, asyncWrapper(UsersController.resetPassword));

export default authRoutes;
