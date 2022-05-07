export interface UserBase {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type UserSignUp = Omit<UserBase, 'id'>;

export type UserLogIn = Pick<UserBase, 'login' | 'password'>;

export type ApiUserSignUpResp = Omit<UserBase, 'password'>;

export type ApiUserLogInResp = { token: string };
