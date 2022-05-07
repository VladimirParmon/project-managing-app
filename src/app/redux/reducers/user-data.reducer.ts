import { createReducer, on } from '@ngrx/store';
import { addFullUserData, addPartUserData } from '../actions/user-data.actions';
import { initialState } from '../models/init';

export const userReducer = createReducer(
  initialState.user,
  on(addFullUserData, (_, { user }): StoreUser => ({ ...user })),
  on(addPartUserData, (state, { part }): StoreUser => ({ ...state, ...part }))
);
