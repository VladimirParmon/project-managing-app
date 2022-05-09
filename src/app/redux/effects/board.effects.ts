/* eslint-disable ngrx/no-dispatch-in-effects */
/* eslint-disable ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError } from 'rxjs';
import { BoardService } from 'src/app/board/services/board.service';
import { IColumn } from 'src/app/shared/models/board.model';
import { ActionTypes } from '../actions/action-types';
import { throwAppError } from '../actions/app-error.actions';
import { deleteColumn } from '../actions/board.actions';
import { findAscendingOrderIndexColumns } from '../reducers/board.reducer';

@Injectable()
export class BoardEffects {
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
          map(() => {
            this.store.dispatch(deleteColumn({ columnId }));

            const { ascendingColumns } = findAscendingOrderIndexColumns(columns, columnId);

            return ascendingColumns;
          }),
          switchMap((ascendingColumns) =>
            ascendingColumns.map((column) => ({
              type: ActionTypes.handleFixColumnOrder,
              boardId,
              column,
            }))
          ),

          catchError(async (err) => throwAppError({ err }))
        )
      )
    )
  );

  handleFixOrderColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.handleFixColumnOrder),
      switchMap(({ boardId, column }) => {
        const { id: columnId, order, title } = column as IColumn;

        const fixedOrder = order - 1;

        return this.boardService.updateColumn(boardId, columnId, title, fixedOrder).pipe(
          switchMap(async () => ({ type: ActionTypes.fixColumnOrder, columnId })),
          catchError(async (err) => throwAppError({ err }))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private store: Store
  ) {}
}
