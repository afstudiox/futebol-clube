export interface Indexable {
  id: number;
}

export interface IEmail {
  email: string;
}

export interface ILogin extends IEmail {
  password: string;
}

export interface IUser extends ILogin, Indexable{
  username: string;
  role: string;
}
