import { HttpErrorResponse } from '@angular/common/http';
import { UserSignUp, UserLogIn } from 'src/app/auth/models/auth.model';
import { StoreUser } from './store.model';

export interface Action {
  type: string;
}

export interface SignUpAction extends Action {
  user: UserSignUp;
}

export interface LogInAction extends Action {
  user: UserLogIn;
}

export interface StoreUserDataAction extends Action {
  dataPart: StoreUser;
}

export interface ErrorAction extends Action {
  err: HttpErrorResponse;
}
