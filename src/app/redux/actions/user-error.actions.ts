import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './action-types';

export const storeAuthError = createAction(
  ActionTypes.newAuthError,
  props<{ error: StoreError }>()
);

export const throwAuthError = createAction(
  ActionTypes.throwAuthError,
  props<{ err: HttpErrorResponse }>()
);
