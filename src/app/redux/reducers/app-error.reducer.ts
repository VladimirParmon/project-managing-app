import { createReducer, on } from '@ngrx/store';
import { clearAppError, storeAppError } from '../actions/app-error.actions';
import { initialState } from '../models/init';
import { StoreError } from '../models/store.model';

export const appErrorReducer = createReducer(
  initialState.appError,
  on(storeAppError, (_, { error }): StoreError => error),
  on(clearAppError, (): StoreError => ({ code: 0, message: '' }))
);
