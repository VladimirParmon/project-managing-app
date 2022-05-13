export interface UserBase {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type UserSignUp = Omit<UserBase, 'id'>;

export type UserLogIn = Pick<UserBase, 'login' | 'password'>;

export type ApiUserSignUpResp = Omit<UserBase, 'password'>;

export type ApiUserUpdateDataResp = UserBase;

export interface ApiUserUpdateDataRequest extends UserBase {
  newPassword: string | undefined;
}

export type ApiUserDeleteRequest = Pick<UserBase, 'id'>;

export type ApiUserLogInResp = { token: string };
