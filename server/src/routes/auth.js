import express from 'express';
import asyncWrapper from '../helpers/asyncWrapper';
import authValidation from '../validations/auth';
import UsersController from '../controllers/Users';
import ValidationHandler from '../middlewares/ValidationHandler';

const authRoutes = express.Router();


authRoutes.post('/signup', authValidation.register, ValidationHandler.validate, asyncWrapper(UsersController.register));
authRoutes.post('/signin', authValidation.login, ValidationHandler.validate, asyncWrapper(UsersController.login));

export default authRoutes;
