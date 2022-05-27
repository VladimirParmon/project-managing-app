import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { StoreError } from '../models/store.model';
import { ActionTypes } from './action-types';

const storeAppError = createAction(ActionTypes.newAppError, props<{ error: StoreError }>());

const throwAppError = createAction(ActionTypes.throwAppError, props<{ err: HttpErrorResponse }>());

const clearAppError = createAction(ActionTypes.clearAppError);

export { storeAppError, throwAppError, clearAppError };
