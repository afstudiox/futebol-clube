import { Router } from 'express';
import UserController from '../controllers/userController';
import { UserService } from '../services/userService';

const userService = new UserService();
const userController = new UserController(userService);

const userRouter = Router();

userRouter.post('/user', (req, res) => userController.findOne(req, res));

export default userRouter;
