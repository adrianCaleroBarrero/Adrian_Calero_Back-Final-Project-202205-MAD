import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { User } from '../models/user.model.js';

export const userController = new UserController(User);
export const userRoutes = Router();

userRoutes.get('/', userController.getAllController);
userRoutes.get('/:id', userController.getController);
userRoutes.post('/register', userController.postController);
userRoutes.post('/login', userController.loginController);
userRoutes.patch('/:id', userController.patchController);
userRoutes.delete('/:id', userController.deleteController);