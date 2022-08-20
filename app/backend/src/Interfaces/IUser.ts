export interface Indexable {
  id: number;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser extends ILogin, Indexable{
  username: string;
  role: string;
}
