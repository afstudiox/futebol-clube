import { Request, Response } from 'express';
import JoiService from '../services/joiServices';
import { IUserService } from '../services/userService';
import NewError from '../middlewares/NewError';
import Jwtservice from '../services/jwtService';
import { IEmail, IUser } from '../Interfaces/IUser';

export default class UserController {
  constructor(
    private userService: IUserService,
  ) {}

  async login(req: Request, res: Response): Promise<void> {
    const result = await JoiService.validadeBodyLogin(req.body); // fazer o validate body no controller
    const token = await this.userService.login(result); // realizar o login e retornar o token em casa de sucesso
    res.status(200).json(token); // retornar o token no formato de objeto
  }

  // verificar se o token é válido
  // caso o token seja válido retornar o role do user
  async authorization(req: Request, res: Response): Promise<void> {
    const token = req.headers.authorization;
    if (!token) throw new NewError('unauthorized', 'Token não encontrado');
    const { email } = Jwtservice.verify(token) as IEmail; // test ok
    const { role } = await this.userService.findUser(email) as IUser; // test ok
    res.status(200).json({ role });
  }
}
