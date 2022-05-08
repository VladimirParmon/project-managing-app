import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './action-types';

export const storeAppError = createAction(ActionTypes.newAppError, props<{ error: StoreError }>());

export const throwAppError = createAction(
  ActionTypes.throwAppError,
  props<{ err: HttpErrorResponse }>()
);
