import { createReducer, on } from '@ngrx/store';
import { saveOpenedBoardName } from '../actions/board.actions';
import { initialState } from '../models/init';

export const titleReducer = createReducer(
  initialState.currentBoardTitle,
  on(saveOpenedBoardName, (_, { title }): string => title)
);
