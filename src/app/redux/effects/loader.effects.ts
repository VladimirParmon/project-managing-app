/* eslint-disable ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { ActionTypes } from '../actions/action-types';
import { setIsLoading } from '../actions/loading.actions';

@Injectable()
export class LoaderEffects {
  constructor(private actions$: Actions) {}

  loaderOn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ActionTypes.fetchBoards,
        ActionTypes.handleDragColumn,
        ActionTypes.fetchBoard,
        ActionTypes.handleSaveOpenedBoardName,
        ActionTypes.postNewTask,
        ActionTypes.deleteTaskOnServer,
        ActionTypes.signUpSubmit,
        ActionTypes.logInSubmit,
        ActionTypes.createColumn,
        ActionTypes.handleDeleteColumn,
        ActionTypes.deleteUser
      ),
      map(() => setIsLoading({ isLoading: true }))
    )
  );

  loaderOff$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ActionTypes.boardsFetched,
        ActionTypes.boardFetched,
        ActionTypes.saveOpenedBoardName,
        ActionTypes.storeNewTask,
        ActionTypes.deleteTaskInStore,
        ActionTypes.afterLoggedIn,
        ActionTypes.setNewBoard,
        ActionTypes.deleteBoard,
        ActionTypes.setNewColumn,
        ActionTypes.deleteColumn,
        ActionTypes.storeAllColumnTasks,
        ActionTypes.logOutSubmit,
        ActionTypes.addFullUserData,
        ActionTypes.addPartUserData,
        ActionTypes.newAppError
      ),
      map(() => setIsLoading({ isLoading: false }))
    )
  );
}
