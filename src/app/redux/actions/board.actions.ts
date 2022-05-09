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
  props<{ boardId: string; column: IColumn }>()
);

export const fixColumnOrder = createAction(
  ActionTypes.fixColumnOrder,
  props<{ columnId: string }>()
);
