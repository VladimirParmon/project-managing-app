import { createAction, props } from '@ngrx/store';
import { ITask, ITaskCreate, ITaskUpdate } from 'src/app/shared/models/board.model';
import { TTasks } from '../models/store.model';
import { ActionTypes } from './action-types';

export const postNewTask = createAction(
  ActionTypes.postNewTask,
  props<{ taskData: ITaskCreate }>()
);

export const storeNewTask = createAction(
  ActionTypes.storeNewTask,
  props<{ fullTaskData: ITask }>()
);

export const storeAllBoardTasks = createAction(
  ActionTypes.storeAllBoardTasks,
  props<{ tasks: TTasks }>()
);

export const deleteTaskOnServer = createAction(
  ActionTypes.deleteTaskOnServer,
  props<{ boardId: string; columnId: string; taskId: string }>()
);

export const deleteTaskInStore = createAction(
  ActionTypes.deleteTaskInStore,
  props<{ taskId: string }>()
);

export const updateTaskOnServer = createAction(
  ActionTypes.updateTaskOnServer,
  props<{ taskData: ITaskUpdate }>()
);

export const updateTaskInStore = createAction(
  ActionTypes.updateTaskInStore,
  props<{ task: ITask }>()
);
