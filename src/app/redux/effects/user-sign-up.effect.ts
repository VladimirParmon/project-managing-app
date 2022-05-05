/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs';
import { ApiAuthService } from 'src/app/auth/services/api-auth.service';
import { throwAuthError } from '../actions/user-error.actions';
import { addFullUserData } from '../actions/user-data.actions';
import { ActionTypes } from '../actions/action-types';

@Injectable()
export class UserSignUpEffect {
  constructor(private actions$: Actions, private auth: ApiAuthService) {}

  onUserSignUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<SignUpAction>(ActionTypes.signUpSubmit),
      switchMap(({ user }) => {
        const { login, name, password } = user;

        return this.auth.signUp(user).pipe(
          switchMap(({ id }) =>
            this.auth
              .singIn({ login, password })
              .pipe(map(({ token }) => addFullUserData({ user: { id, name, login, token } })))
          ),
          catchError(async (err) => throwAuthError({ err }))
        );
      })
    );
  });
}
