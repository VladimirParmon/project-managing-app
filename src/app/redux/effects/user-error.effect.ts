/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { ActionTypes } from '../actions/action-types';
import { storeAuthError } from '../actions/user-error.actions';
import { ErrorAction } from '../models/imported-actions.model';

@Injectable()
export class UserErrorEffect {
  constructor(private actions$: Actions) {}

  onAuthError$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<ErrorAction>(ActionTypes.throwAuthError),
      map(({ err }) => {
        const error =
          typeof err.error === 'string'
            ? { code: err.status, message: err.error }
            : { code: err.error.code, message: err.error.message };

        return storeAuthError({ error });
      })
    );
  });
}
