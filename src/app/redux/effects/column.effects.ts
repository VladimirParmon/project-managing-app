/* eslint-disable ngrx/no-dispatch-in-effects */
/* eslint-disable ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, from, concatMap, finalize } from 'rxjs';
import { OPERATIONS } from 'src/app/board/constants/operations';
import { BoardService } from 'src/app/board/services/board.service';
import { IColumn } from 'src/app/shared/models/board.model';
import { ActionTypes } from '../actions/action-types';
import { throwAppError } from '../actions/app-error.actions';
import {
  deleteColumn,
  fixColumnOrder,
  fixOrderHelper,
  handleFixColumnOrder,
} from '../actions/column.actions';
import { setIsLoading } from '../actions/loading.actions';
import { TColumns } from '../models/store.model';
import { findAscendingOrderIndexColumns } from '../utils/columns-order';

@Injectable()
export class ColumnEffects {
  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private store: Store
  ) {}

  fetchBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.fetchBoard),
      switchMap(({ id }) =>
        this.boardService.fetchColumnsById(id).pipe(
          map((columns) => ({ type: ActionTypes.boardFetched, columns, boardId: id })),
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
              handleFixColumnOrder({
                boardId,
                columns: editableColumns,
                operation: OPERATIONS.DECREMENT,
              }),
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
      map(({ boardId, columns, operation, dragColumn }) => {
        const fixedColumns =
          operation === OPERATIONS.DECREMENT ? [...columns] : ([...columns] as TColumns).reverse();

        if (dragColumn) {
          fixedColumns.push(dragColumn);
        }

        return fixOrderHelper({ fixedColumns, operation, boardId });
      })
    )
  );

  fixOrderHelper$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.fixOrderHelper),
      concatMap(({ fixedColumns, operation, boardId }) =>
        from(fixedColumns).pipe(
          concatMap(({ id: columnId, order, title }) => {
            const fixedOrder = operation === OPERATIONS.DECREMENT ? order - 1 : order + 1;
            return this.boardService.updateColumn(boardId, columnId, title, fixedOrder);
          }),
          switchMap(async ({ id, order }) => fixColumnOrder({ columnId: id, newOrder: order })),
          catchError(async (err) => throwAppError({ err })),
          finalize(() => this.store.dispatch(setIsLoading({ isLoading: false })))
        )
      )
    )
  );

  handleDragColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.handleDragColumn),
      switchMap(({ boardId, currentIndex, currentDragColumn, fixableOrderColumns, operation }) => {
        const { id: columnId, title } = currentDragColumn as IColumn;

        const fixNumber = operation === OPERATIONS.DECREMENT ? 1 : -1;

        const newOrder = currentIndex + 1 + fixNumber;

        const columns = [...fixableOrderColumns] as TColumns;

        const dragColumn = { id: columnId, title, order: newOrder };

        return this.boardService.updateColumn(boardId, columnId, title, 0).pipe(
          map(() => handleFixColumnOrder({ boardId, columns, operation, dragColumn })),
          catchError(async (err) => throwAppError({ err }))
        );
      })
    )
  );
}
