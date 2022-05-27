import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './action-types';

export const setIsLoading = createAction(ActionTypes.setIsLoading, props<{ isLoading: boolean }>());
