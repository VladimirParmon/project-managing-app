import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './action-types';

const storeAppError = createAction(ActionTypes.newAppError, props<{ error: StoreError }>());

const throwAppError = createAction(ActionTypes.throwAppError, props<{ err: HttpErrorResponse }>());

export { storeAppError, throwAppError };
