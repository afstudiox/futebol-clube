import { Router } from 'express';
// import JoiService from '../services/joiServices';
import UserController from '../controllers/userController';
import { UserService } from '../services/userService';

const userService = new UserService();
const userController = new UserController(userService);

const loginRouter = Router();
loginRouter.post('/', (req, res) => userController.login(req, res));

export default loginRouter;
