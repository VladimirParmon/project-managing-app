import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './action-types';

export const handleSetIsLoading = createAction(
  ActionTypes.handleSetIsLoading,
  props<{ isLoading: boolean }>()
);

export const setIsLoading = createAction(ActionTypes.setIsLoading, props<{ isLoading: boolean }>());
