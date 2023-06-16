import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UsersController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UsersController.createUserController
);

export const UserRoutes = router;
