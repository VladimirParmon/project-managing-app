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
import { onLogOutSubmit } from '../actions/user-data.actions';
import { throwAppError } from '../actions/app-error.actions';

@Injectable()
export class UserDeleteEffect {
  constructor(
    private actions$: Actions,
    private apiUsers: ApiUsersService,
    private auth: ApiAuthService,
    private store: Store
  ) {}

  onUserDelete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<UpdateAction>(ActionTypes.deleteUser),
      concatLatestFrom(() => this.store.select(selectUserId)),
      switchMap(([payload, id]) => {
        const { login, password } = payload.user;

        return this.auth.singIn({ login: login[0], password }).pipe(
          concatMap(() => {
            return this.apiUsers.deleteUser({ id: id as string }).pipe(
              switchMap(async () => onLogOutSubmit()),
              catchError(async (err) => throwAppError({ err }))
            );
          }),
          catchError(async (err) => throwAppError({ err }))
        );
      })
    );
  });
}
