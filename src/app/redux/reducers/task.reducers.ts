import { createReducer, on } from '@ngrx/store';
import {
  deleteTaskInStore,
  storeAllBoardTasks,
  storeNewTask,
  updateTaskInStore,
} from '../actions/task.actions';
import { initialState } from '../models/init';
import { TTasks } from '../models/store.model';

export const taskReducer = createReducer(
  initialState.tasks,
  on(storeNewTask, (state, { fullTaskData }): TTasks => [...state, fullTaskData]),
  on(storeAllBoardTasks, (_, { tasks }): TTasks => tasks),
  on(deleteTaskInStore, (state, { taskId }) => state.filter((task) => task.id !== taskId))
  //on(updateTaskInStore, (state, { task }) => [...state, state.filter((singleTask) => singleTask.id === task.id ? task : singleTask)]
);
