import express from 'express';
import authValidation from '../validations/auth';
import UsersController from '../controllers/Users';
import ValidationHandler from '../middlewares/ValidationHandler';

const authRoutes = express.Router();


authRoutes.post('/signup', authValidation.register, (req, res) =>
  ValidationHandler.validate(req, res, UsersController.register));


export default authRoutes;
