import { ILogin, IUser } from '../Interfaces/IUser';
import UserModel from '../database/models/user';
import EncryptyService from './encriptService';
import NewError from '../middlewares/NewError';
import JwtService from './jwtService';
import { IToken } from '../Interfaces/IToken';

export interface IUserService {
  listAll(): Promise<IUser[]>
  findUser(email:string): Promise<IUser | null>
  login({ email, password }:ILogin): Promise<IToken>
}

export class UserService implements IUserService {
  private userModel;
  constructor() { this.userModel = UserModel; }

  async listAll(): Promise<IUser[]> {
    const users = await this.userModel.findAll();
    return users;
  }

  async findUser(email:string): Promise<IUser | null> {
    const user: IUser | null = await this.userModel.findOne({
      where: { email },
      raw: true,
    });
    return user;
  }

  async login({ password, email }: ILogin): Promise<IToken> {
    const user: IUser | null = await this.findUser(email); // buscar o usuario pelo email
    if (!user) throw new NewError('NotFoundError', 'User Not Found'); // se não encontrar um usuário dá um erro
    const passwordHash:string = EncryptyService.encrypt(password); // aplicar um hash na senha do body com bcrypt
    const authenticate:boolean = EncryptyService.compare(password, passwordHash); // Comparar com o hash da db
    if (!authenticate) throw new NewError('UnauthorizedError', 'Email or password is not valid'); // se as senhas não baterem dá um erro
    const token = JwtService.sign({ email }); // gerar o token com jwt
    return { token }; // retornar o token dentro de um objeto
  }
}
