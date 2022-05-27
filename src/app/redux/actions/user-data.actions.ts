import { createAction, props } from '@ngrx/store';
import { UserSignUp, UserLogIn, ApiUserDeleteRequest } from 'src/app/auth/models/auth.model';
import { UpdateUserDataType } from '../models/actions.model';
import { StoreUser } from '../models/store.model';
import { ActionTypes } from './action-types';

const addFullUserData = createAction(ActionTypes.addFullUserData, props<{ user: StoreUser }>());

const addPartUserData = createAction(ActionTypes.addPartUserData, props<{ part: StoreUser }>());

const addDataAfterSignIn = createAction(ActionTypes.afterLoggedIn, props<{ login: string }>());

const onSignUpSubmit = createAction(ActionTypes.signUpSubmit, props<{ user: UserSignUp }>());

const onLogInSubmit = createAction(ActionTypes.logInSubmit, props<{ user: UserLogIn }>());

const onLogOutSubmit = createAction(ActionTypes.logOutSubmit);

const updateUserData = createAction(
  ActionTypes.updateUserData,
  props<{ user: UpdateUserDataType }>()
);

const deleteUser = createAction(
  ActionTypes.deleteUser,
  props<{ user: Omit<ApiUserDeleteRequest, 'id'> }>()
);

export {
  addFullUserData,
  onSignUpSubmit,
  onLogInSubmit,
  addPartUserData,
  addDataAfterSignIn,
  onLogOutSubmit,
  updateUserData,
  deleteUser,
};
