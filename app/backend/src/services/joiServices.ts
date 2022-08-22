import * as Joi from 'joi';
import { ILogin } from '../Interfaces/IUser';

export default class JoiService {
  static async validadeBodyLogin(dataForValidate: ILogin): Promise<ILogin> {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const dataValidate = await schema.validateAsync(dataForValidate);
    return dataValidate;
  }
}
