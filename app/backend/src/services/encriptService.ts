import { compareSync, hashSync } from 'bcryptjs';

const EncryptyService = {
  encrypt: (password: string) => {
    const encrypted = hashSync(password);
    return encrypted;
  },

  compare: (password: string, passHash: string):boolean => compareSync(password, passHash),
};

export default EncryptyService;
