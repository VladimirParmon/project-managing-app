interface Action {
  type: string;
}

interface SignUpAction extends Action {
  user: UserSignUp;
}

interface LogInAction extends Action {
  user: UserLogIn;
}

interface StoreUserDataAction extends Action {
  dataPart: StoreUser;
}
