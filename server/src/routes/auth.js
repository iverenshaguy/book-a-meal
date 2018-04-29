import express from 'express';
import authValidation from '../validations/auth';
import UsersController from '../controllers/Users';
import ValidationHandler from '../middlewares/ValidationHandler';

const authRoutes = express.Router();


authRoutes.post('/signup', authValidation.register, ValidationHandler.validate, UsersController.register);
authRoutes.post('/signin', authValidation.login, ValidationHandler.validate, UsersController.login);

export default authRoutes;
