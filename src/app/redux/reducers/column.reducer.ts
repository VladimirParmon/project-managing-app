import { createReducer, on } from '@ngrx/store';
import { IColumn } from 'src/app/shared/models/board.model';
import {
  boardFetched,
  deleteColumn,
  fixColumnOrder,
  setNewColumn,
} from '../actions/column.actions';
import { initialState } from '../models/init';
import { TColumns } from '../models/store.model';

export function findAscendingOrderIndexColumns(columns: TColumns, currentColumnId: string) {
  const currentColumn = columns.find(({ id }) => id === currentColumnId) as IColumn;

  return columns.filter(({ order }) => order > currentColumn.order);
}

export const boardReducer = createReducer(
  initialState.boardInfo,

  on(boardFetched, (_, { columns }): TColumns => columns),

  on(setNewColumn, (columns, { id, order, title }): TColumns => [...columns, { id, order, title }]),

  on(deleteColumn, (columns, { columnId }) => columns.filter((column) => column.id !== columnId)),

  on(fixColumnOrder, (columns, { columnId, newOrder }) =>
    columns.map((col) => (col.id === columnId ? { ...col, order: newOrder } : col))
  )
);
