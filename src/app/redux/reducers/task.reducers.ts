import { createReducer, on } from '@ngrx/store';
import {
  deleteTaskInStore,
  // storeAllBoardTasks,
  storeNewTask,
  updateTaskInStore,
  storeAllColumnTasks,
} from '../actions/task.actions';
import { initialState } from '../models/init';
import { TTasks } from '../models/store.model';

export const taskReducer = createReducer(
  initialState.tasks,
  on(storeNewTask, (state, { fullTaskData }): TTasks => {
    const { columnId } = fullTaskData;
    const oldStack = state[columnId];
    return { ...state, [columnId]: [...oldStack, fullTaskData] };
  }),
  on(
    storeAllColumnTasks,
    (state, { tasks, columnId }): TTasks => ({ ...state, [columnId]: [...tasks] })
  ),
  on(
    deleteTaskInStore,
    (state, { taskId, columnId }): TTasks => ({
      ...state,
      [columnId]: state[columnId].filter((task) => task.id !== taskId),
    })
  ),
  on(updateTaskInStore, (state, { task }): TTasks => {
    const { columnId } = task;
    const editedColumn = state[columnId].map((item) => {
      if (item.id === task.id) return task;
      return item;
    });
    return { ...state, [columnId]: editedColumn };
  })
);
