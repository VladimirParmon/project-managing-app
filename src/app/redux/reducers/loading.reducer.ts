import { createReducer, on } from '@ngrx/store';
import { setIsLoading } from '../actions/loading.actions';
import { initialState } from '../models/init';
import { TLoading } from '../models/store.model';

export const loadingReducer = createReducer(
  initialState.isLoading,
  on(setIsLoading, (_, { isLoading }): TLoading => isLoading)
);
