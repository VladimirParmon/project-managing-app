import { createReducer, on } from '@ngrx/store';
import { boardsFetched, deleteBoard, setNewBoard } from '../actions/boards.actions';
import { initialState } from '../models/init';
import { TBoards } from '../models/store.model';

export const boardsReducer = createReducer(
  initialState.boards,
  on(setNewBoard, (state, { id, title }): TBoards => [...state, { title, id }]),

  on(deleteBoard, (state, { id }) => state.filter((board) => board.id !== id)),

  on(boardsFetched, (_, { boards }): TBoards => boards)
);
