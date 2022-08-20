import { Router } from "express";
import JoiService from "../services/joiServices";
import UserController from "../controllers/userController";
import { UserService } from "../services/userService";

const userService = new UserService;
const joiService = new JoiService;
const userController =  new UserController(userService, joiService);

const userRouter = Router();

userRouter.get('/', (req, res) => userController.listAll(req, res));
userRouter.post('/user', (req, res) => userController.findOne(req, res));

export default userRouter