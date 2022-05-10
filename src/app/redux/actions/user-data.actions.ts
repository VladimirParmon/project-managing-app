import { createAction, props } from '@ngrx/store';
import { UserSignUp, UserLogIn } from 'src/app/auth/models/auth.model';
import { StoreUser } from '../models/store.model';
import { ActionTypes } from './action-types';

const addFullUserData = createAction(ActionTypes.addFullUserData, props<{ user: StoreUser }>());

const addPartUserData = createAction(ActionTypes.addPartUserData, props<{ part: StoreUser }>());

const addDataAfterSignIn = createAction(ActionTypes.afterLoggedIn, props<{ login: string }>());

const onSignUpSubmit = createAction(ActionTypes.signUpSubmit, props<{ user: UserSignUp }>());

const onLogInSubmit = createAction(ActionTypes.logInSubmit, props<{ user: UserLogIn }>());

const onLogOutSubmit = createAction(ActionTypes.logOutSubmit);

export {
  addFullUserData,
  onSignUpSubmit,
  onLogInSubmit,
  addPartUserData,
  addDataAfterSignIn,
  onLogOutSubmit,
};
