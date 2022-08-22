import { Request, Response } from 'express';
import JoiService from '../services/joiServices';
import { IUserService } from '../services/userService';

export default class UserController {
  constructor(
    private userService: IUserService,
  ) {}

  async findOne(req: Request, res: Response): Promise<void> {
    const { email } = req.body;
    const user = await this.userService.findUser(email);
    res.status(200).json(user);
  }

  async login(req: Request, res: Response): Promise<void> {
    const result = await JoiService.validadeBodyLogin(req.body); // fazer o validate body no controller

    const token = await this.userService.login(result); // realizar o login e retornar o token em casa de sucesso

    res.status(200).json(token); // retornar o token no formato de objeto
  }
}
