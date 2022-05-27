/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { ApiAuthService } from 'src/app/auth/services/api-auth.service';
import { ApiUsersService } from 'src/app/core/services/api-users.service';
import { Store } from '@ngrx/store';
import { catchError, concatMap, switchMap } from 'rxjs';
import { ActionTypes } from '../actions/action-types';
import { UpdateAction } from '../models/actions.model';
import { selectUserId } from '../selectors/user.selectors';
import { addPartUserData } from '../actions/user-data.actions';
import { throwAppError } from '../actions/app-error.actions';

@Injectable()
export class UserUpdateDataEffect {
  constructor(
    private actions$: Actions,
    private apiUsers: ApiUsersService,
    private auth: ApiAuthService,
    private store: Store
  ) {}

  onUserUpdateSubmit$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<UpdateAction>(ActionTypes.updateUserData),
      concatLatestFrom(() => this.store.select(selectUserId)),
      switchMap(([payload, id]) => {
        const { login, password } = payload.user;
        const [currentLogin, newLogin] = login;

        return this.auth.singIn({ login: currentLogin, password }).pipe(
          concatMap(() => {
            return this.apiUsers
              .updateUser({ ...payload.user, login: newLogin, id: id as string })
              .pipe(
                switchMap(async (resp) =>
                  addPartUserData({ part: { login: resp.login, name: resp.name } })
                ),
                catchError(async (err) => throwAppError({ err }))
              );
          }),
          catchError(async (err) => throwAppError({ err }))
        );
      })
    );
  });
}
