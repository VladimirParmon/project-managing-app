import { createReducer, on } from '@ngrx/store';
import { IColumn } from 'src/app/shared/models/board.model';
import { boardFetched, deleteColumn, fixColumnOrder, setNewColumn } from '../actions/board.actions';
import { initialState } from '../models/init';
import { TColumns } from '../models/store.model';

export function findAscendingOrderIndexColumns(columns: TColumns, currentColumnId: string) {
  const currentColumn = columns.find(({ id }) => id === currentColumnId) as IColumn;

  const ascendingColumns = columns.filter(({ order }) => order > currentColumn?.order!);

  return {
    currentColumn,
    ascendingColumns,
  };
}

export const boardReducer = createReducer(
  initialState.boardInfo,

  on(boardFetched, (_, { columns }): TColumns => columns),

  on(setNewColumn, (columns, { id, order, title }): TColumns => [...columns, { id, order, title }]),

  on(deleteColumn, (columns, { columnId }) => columns.filter((column) => column.id !== columnId)),

  on(fixColumnOrder, (columns, { columnId }) => {
    const fixingColumn = columns.find(({ id }) => id === columnId) as IColumn;

    const pureColumns = columns.filter(({ id }) => id !== fixingColumn.id);

    return [
      ...pureColumns,
      {
        ...fixingColumn,
        order: fixingColumn.order - 1,
      },
    ];
  })
);
