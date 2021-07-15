import { Router } from 'express';
import { userController } from '../controller/UserController';
import { authMiddleware } from '../middleware/AuthMiddleware';

const authRouter = Router();

// Register a user
authRouter.post('/register', userController.register);

// Login for a user
authRouter.post('/login', userController.login);

// Get auth token from refresh token
authRouter.post('/token', userController.getToken);

// Get modules
authRouter.get('/modules', authMiddleware.isValidUser, userController.getModules);


export default authRouter;