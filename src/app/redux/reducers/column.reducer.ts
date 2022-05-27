import { createReducer, on } from '@ngrx/store';
import { IColumn } from 'src/app/shared/models/board.model';
import {
  boardFetched,
  deleteColumn,
  fixColumnOrder,
  fixSortingByOrder,
  setNewColumn,
} from '../actions/column.actions';
import { initialState } from '../models/init';
import { TColumns } from '../models/store.model';

const sortingPredicate = (first: IColumn, second: IColumn) => first.order - second.order;

export const columnReducer = createReducer(
  initialState.boardInfo,

  on(boardFetched, (_, { columns }): TColumns => [...columns].sort(sortingPredicate)),

  on(setNewColumn, (columns, { id, order, title }): TColumns => [...columns, { id, order, title }]),

  on(deleteColumn, (columns, { columnId }) => columns.filter((column) => column.id !== columnId)),

  on(fixColumnOrder, (columns, { columnId, newOrder }) =>
    [...columns]
      .map((col) => (col.id === columnId ? { ...col, order: newOrder } : col))
      .sort(sortingPredicate)
  ),

  on(fixSortingByOrder, (columns) => [...columns].sort(sortingPredicate))
);
