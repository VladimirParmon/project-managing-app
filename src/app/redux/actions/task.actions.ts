import { createAction, props } from '@ngrx/store';
import { ITask, ITaskCreate, ITaskUpdate } from 'src/app/shared/models/board.model';
import { OPERATIONS } from 'src/app/board/constants/operations';
import { ActionTypes } from './action-types';

export const postNewTask = createAction(
  ActionTypes.postNewTask,
  props<{ taskData: ITaskCreate }>()
);

export const storeNewTask = createAction(
  ActionTypes.storeNewTask,
  props<{ fullTaskData: ITask }>()
);

export const storeAllColumnTasks = createAction(
  ActionTypes.storeAllColumnTasks,
  props<{ tasks: ITask[]; columnId: string }>()
);

export const deleteTaskOnServer = createAction(
  ActionTypes.deleteTaskOnServer,
  props<{ boardId: string; columnId: string; taskId: string }>()
);

export const deleteTaskInStore = createAction(
  ActionTypes.deleteTaskInStore,
  props<{ taskId: string; columnId: string }>()
);

export const updateTaskData = createAction(ActionTypes.updateTaskData, props<{ task: ITask }>());

export const handleDragTask = createAction(
  ActionTypes.dragTask,
  props<{ task: ITask; fixableOrderTasks: ITask[]; operation: OPERATIONS; currentIndex: number }>()
);

export const handleFixTaskOrder = createAction(
  ActionTypes.handleFixTasksOrder,
  props<{
    boardId: string;
    tasks: ITask[];
    operation: OPERATIONS;
    task: { id: string; title: string; description: string; order: number };
  }>()
);

export const updateTaskOnServer = createAction(
  ActionTypes.updateTaskOnServer,
  props<{ taskData: ITaskUpdate }>()
);

export const updateTaskInStore = createAction(
  ActionTypes.updateTaskInStore,
  props<{ task: ITask }>()
);

export const fixTasksHelper = createAction(
  ActionTypes.fixTasksHelper,
  props<{ fixedTasks: ITask[]; operation: string; boardId: string }>()
);
