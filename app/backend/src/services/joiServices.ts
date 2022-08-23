import * as Joi from 'joi';
import { ILogin } from '../Interfaces/IUser';

export default class JoiService {
  static async validadeBodyLogin(dataForValidate: ILogin): Promise<ILogin> {
    const schema = Joi.object({
      email: Joi.string().email().required()
        .messages({ 'string.empty': 'All fields must be filled' }),
      password: Joi.string().required()
        .messages({ 'string.empty': 'All fields must be filled' }),
    });
    const dataValidate = await schema.validateAsync(dataForValidate);
    return dataValidate;
  }
}
