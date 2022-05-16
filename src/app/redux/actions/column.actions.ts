import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/models/board.model';
import { TColumns } from '../models/store.model';
import { ActionTypes } from './action-types';

export const fetchBoardInfo = createAction(ActionTypes.fetchBoard, props<{ id: string }>());

export const boardFetched = createAction(ActionTypes.boardFetched, props<{ columns: TColumns }>());

export const createColumn = createAction(
  ActionTypes.createColumn,
  props<{ title: string; boardId: string; order: number }>()
);

export const setNewColumn = createAction(
  ActionTypes.setNewColumn,
  props<{ id: string; order: number; title: string }>()
);

export const handleDeleteColumn = createAction(
  ActionTypes.handleDeleteColumn,
  props<{ boardId: string; columnId: string; columns: TColumns }>()
);

export const deleteColumn = createAction(ActionTypes.deleteColumn, props<{ columnId: string }>());

export const handleFixColumnOrder = createAction(
  ActionTypes.handleFixColumnOrder,
  props<{ boardId: string; columns: TColumns; operation: string; dragColumn?: IColumn }>()
);

export const fixColumnOrder = createAction(
  ActionTypes.fixColumnOrder,
  props<{ columnId: string; newOrder: number }>()
);

export const handleDragColumn = createAction(
  ActionTypes.handleDragColumn,
  props<{
    boardId: string;
    fixableOrderColumns: TColumns;
    currentDragColumn: IColumn;
    currentIndex: number;
    operation: string;
  }>()
);

export const dragColumn = createAction(
  ActionTypes.dragColumn,
  props<{
    columnId: string;
    fixedOrder: number;
  }>()
);

export const fixDragColumnOrder = createAction(
  ActionTypes.fixDragColumnOrder,
  props<{
    boardId: string;
    currentDragColumn: IColumn;
    newOrder: number;
  }>()
);

export const fixSortingByOrder = createAction(ActionTypes.fixSortingByOrder);

export const fixOrderHelper = createAction(
  ActionTypes.fixOrderHelper,
  props<{ fixedColumns: TColumns; operation: string; boardId: string }>()
);
