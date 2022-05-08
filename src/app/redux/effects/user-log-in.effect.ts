/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, switchMap } from 'rxjs';
import { ApiAuthService } from 'src/app/auth/services/api-auth.service';
import { ApiUsersService } from 'src/app/core/services/api-users.service';
import { throwAppError } from '../actions/app-error.actions';
import { addDataAfterSignIn, addPartUserData } from '../actions/user-data.actions';
import { ActionTypes } from '../actions/action-types';

@Injectable()
export class UserLogInEffect {
  constructor(
    private actions$: Actions,
    private auth: ApiAuthService,
    private apiUsers: ApiUsersService
  ) {}

  onUserLogIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<LogInAction>(ActionTypes.logInSubmit),
      exhaustMap(({ user }) => {
        const { login } = user;

        return this.auth.singIn(user).pipe(
          switchMap(({ token }) => [
            addPartUserData({ part: { login, token } }),
            addDataAfterSignIn({ login }),
          ]),
          catchError(async (err) => throwAppError({ err }))
        );
      })
    );
  });

  afterUserSignIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.afterLoggedIn),
      switchMap(({ login }) =>
        this.apiUsers.getUsers().pipe(
          map((userList) => {
            const properUser = userList.find((_user) => _user.login === login);
            const { id, name } = properUser as ApiUserSignUpResp;

            return addPartUserData({ part: { id, name } });
          })
        )
      )
    );
  });
}
