import { createReducer, on } from '@ngrx/store';
import { storeAppError } from '../actions/app-error.actions';
import { initialState } from '../models/init';

export const appErrorReducer = createReducer(
  initialState.appError,
  on(storeAppError, (_, { error }): StoreError => error)
);
