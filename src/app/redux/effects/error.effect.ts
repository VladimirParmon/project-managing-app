/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { ActionTypes } from '../actions/action-types';
import { storeAppError } from '../actions/app-error.actions';
import { ErrorAction } from '../models/actions.model';

@Injectable()
export class ErrorEffect {
  constructor(private actions$: Actions) {}

  onAppError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<ErrorAction>(ActionTypes.throwAppError),
      map(({ err }) => {
        const error =
          typeof err.error === 'string'
            ? { code: err.status, message: err.error }
            : { code: err.error.code, message: err.error.message };

        return storeAppError({ error });
      })
    );
  });
}
