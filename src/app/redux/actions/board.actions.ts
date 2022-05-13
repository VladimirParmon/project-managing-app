import { createAction, props } from '@ngrx/store';
import { TBoards } from '../models/store.model';
import { ActionTypes } from './action-types';

export const fetchBoards = createAction(ActionTypes.fetchBoards);

export const boardsFetched = createAction(ActionTypes.boardsFetched, props<{ boards: TBoards }>());

export const createBoard = createAction(ActionTypes.createBoard, props<{ title: string }>());

export const handleSaveOpenedBoardName = createAction(
  ActionTypes.handleSaveOpenedBoardName,
  props<{ title: string }>()
);

export const saveOpenedBoardName = createAction(
  ActionTypes.saveOpenedBoardName,
  props<{ title: string }>()
);

export const setNewBoard = createAction(
  ActionTypes.setNewBoard,
  props<{ id: string; title: string }>()
);

export const handleDeleteBoard = createAction(
  ActionTypes.handleDeleteBoard,
  props<{ id: string }>()
);

export const deleteBoard = createAction(ActionTypes.deleteBoard, props<{ id: string }>());
