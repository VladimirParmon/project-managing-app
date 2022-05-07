import { createReducer, on } from '@ngrx/store';
import { storeAuthError } from '../actions/user-error.actions';
import { initialState } from '../models/init';
import { StoreError } from '../models/store.model';

export const userErrorReducer = createReducer(
  initialState.userApiError,
  on(storeAuthError, (_, { error }): StoreError => error)
);
