/* eslint-disable ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, tap } from 'rxjs';
import { BoardService } from 'src/app/board/services/board.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ActionTypes } from '../actions/action-types';
import { throwAppError } from '../actions/app-error.actions';
import { LStorageKeys } from '../constants/store-keys';
import { selectUserId } from '../selectors/user.selectors';

@Injectable()
export class BoardsEffects {
  fetchBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.fetchBoards),
      concatLatestFrom(() => this.store.select(selectUserId)),
      switchMap(([, userId]) =>
        this.boardService.fetchBoards().pipe(
          map((boards) => {
            const newBoard = boards.filter((item) => {
              const boardUserId = item.title.split('***')[0];
              if (boardUserId === 'example-board') return true;
              return boardUserId === userId;
            });
            return {
              type: ActionTypes.boardsFetched,
              boards: newBoard,
            };
          }),
          catchError(async (err) => throwAppError({ err }))
        )
      )
    )
  );

  createBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.createBoard),
      concatLatestFrom(() => this.store.select(selectUserId)),
      switchMap(([{ title }, userId]) => {
        const newTitle = `${userId}***${title}`;
        return this.boardService.createBoard(newTitle).pipe(
          map(({ id }) => ({ type: ActionTypes.setNewBoard, id, title: newTitle })),
          catchError(async (err) => throwAppError({ err }))
        );
      })
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

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private store: Store
  ) {}
}
