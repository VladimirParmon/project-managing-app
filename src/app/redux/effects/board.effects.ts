/* eslint-disable ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs';
import { BoardService } from 'src/app/board/services/board.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ActionTypes } from '../actions/action-types';
import { throwAppError } from '../actions/app-error.actions';
import { LStorageKeys } from '../constants/store-keys';

@Injectable()
export class BoardsEffects {
  fetchBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.fetchBoards),
      mergeMap(() =>
        this.boardService.fetchBoards().pipe(
          map((boards) => ({
            type: ActionTypes.boardsFetched,
            boards,
          })),
          catchError(async (err) => throwAppError({ err }))
        )
      )
    )
  );

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.createBoard),
      switchMap(({ title }) =>
        this.boardService.createBoard(title).pipe(
          map(({ id }) => ({ type: ActionTypes.setNewBoard, id, title })),
          catchError(async (err) => throwAppError({ err }))
        )
      )
    )
  );

  deleteBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.handleDeleteBoard),
      switchMap(({ id }) =>
        this.boardService.deleteBoard(id).pipe(
          map(() => ({ type: ActionTypes.deleteBoard, id })),
          catchError(async (err) => throwAppError({ err }))
        )
      )
    )
  );

  storeOpenedBoardTitle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.handleSaveOpenedBoardName),
      map(({ title }) => ({ type: ActionTypes.saveOpenedBoardName, title })),
      tap(({ title }) =>
        LocalStorageService.setIndividualKey(title, LStorageKeys.currentBoardTitle)
      )
    )
  );

  constructor(private actions$: Actions, private boardService: BoardService) {}
}
