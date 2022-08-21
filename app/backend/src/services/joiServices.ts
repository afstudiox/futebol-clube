import * as Joi from 'joi';
import { ILogin } from '../Interfaces/IUser';

// const JoiService = {
//   validadeBodyLogin: async (dataForValidate: ILogin) => {
//     const schema = Joi.object({
//       email: Joi.string().email().required(),
//       password: Joi.string().required(),
//     });
//     const dataValidate = await schema.validateAsync(dataForValidate);
//     return dataValidate;
//   },
// };

// export default JoiService;

// export interface IJoiServices {
//   validadeBodyLogin(dataForValidate: ILogin): Promise<ILogin>
// }

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
