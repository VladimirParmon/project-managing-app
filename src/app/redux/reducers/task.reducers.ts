import { createReducer, on } from '@ngrx/store';
import { storeNewTask } from '../actions/task.actions';
import { initialState } from '../models/init';
import { TColumns } from '../models/store.model';

export const boardsReducer = createReducer(
  initialState.boardInfo,
  on(storeNewTask, (state, { fullTaskData }): TColumns => [...state, fullTaskData])
);
