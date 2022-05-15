import { createReducer, on } from '@ngrx/store';
import { deleteTaskInStore, storeAllBoardTasks, storeNewTask } from '../actions/task.actions';
import { initialState } from '../models/init';
import { TTasks } from '../models/store.model';

export const taskReducer = createReducer(
  initialState.tasks,
  on(storeNewTask, (state, { fullTaskData }): TTasks => [...state, fullTaskData]),
  on(storeAllBoardTasks, (_, { tasks }) => tasks),
  on(deleteTaskInStore, (state, { taskId }) => state.filter((task) => task.id !== taskId))
);
