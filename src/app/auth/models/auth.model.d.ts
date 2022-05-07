interface UserBase {
  id: string;
  name: string;
  login: string;
  password: string;
}

type UserSignUp = Omit<UserBase, 'id'>;

type UserLogIn = Pick<UserBase, 'login' | 'password'>;

type ApiUserSignUpResp = Omit<UserBase, 'password'>;

type ApiUserLogInResp = { token: string };
