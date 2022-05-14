import { createAction, props } from '@ngrx/store';
import { ITask, ITaskCreate } from 'src/app/shared/models/board.model';
import { ActionTypes } from './action-types';

export const postNewTask = createAction(
  ActionTypes.postNewTask,
  props<{ taskData: ITaskCreate }>()
);

export const storeNewTask = createAction(
  ActionTypes.storeNewTask,
  props<{ fullTaskData: ITask }>()
);

export const deleteTaskOnServer = createAction(
  ActionTypes.deleteTaskServer,
  props<{ boardId: string; columnId: string }>()
);

export const deleteTaskInStore = createAction(
  ActionTypes.deleteTaskStore,
  props<{ boardId: string; columnId: string }>()
);
