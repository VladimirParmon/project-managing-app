/* eslint-disable ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { switchMap, map, catchError, from, concatMap } from 'rxjs';
import { BoardService } from 'src/app/board/services/board.service';
import { ActionTypes } from '../actions/action-types';
import { throwAppError } from '../actions/app-error.actions';
import { deleteColumn, fixColumnOrder, handleFixColumnOrder } from '../actions/column.actions';
import { findAscendingOrderIndexColumns } from '../utils/columns-order';

@Injectable()
export class ColumnEffects {
  constructor(private actions$: Actions, private boardService: BoardService) {}

  fetchBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.fetchBoard),
      switchMap(({ id }) =>
        this.boardService.fetchColumnsById(id).pipe(
          map((columns) => ({ type: ActionTypes.boardFetched, columns })),
          catchError(async (err) => throwAppError({ err }))
        )
      )
    )
  );

  createColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.createColumn),
      switchMap(({ title, boardId, order }) =>
        this.boardService.createColumn(boardId, title, order).pipe(
          map(({ id }) => ({ type: ActionTypes.setNewColumn, id, order, title })),
          catchError(async (err) => throwAppError({ err }))
        )
      )
    )
  );

  deleteColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.handleDeleteColumn),
      switchMap(({ boardId, columnId, columns }) =>
        this.boardService.deleteColumn(boardId, columnId).pipe(
          switchMap(() => {
            const editableColumns = findAscendingOrderIndexColumns(columns, columnId);

            return [
              deleteColumn({ columnId }),
              handleFixColumnOrder({ boardId, columns: editableColumns }),
            ];
          }),

          catchError(async (err) => throwAppError({ err }))
        )
      )
    )
  );

  handleFixOrderColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.handleFixColumnOrder),
      switchMap(({ boardId, columns }) =>
        from(columns).pipe(
          concatMap(({ id: columnId, order, title }) => {
            const fixedOrder = order - 1;
            return this.boardService.updateColumn(boardId, columnId, title, fixedOrder);
          }),
          map(({ id, order }) => fixColumnOrder({ columnId: id, newOrder: order })),
          catchError(async (err) => throwAppError({ err }))
        )
      )
    )
  );
}
