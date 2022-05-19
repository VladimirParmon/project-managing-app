/* eslint-disable arrow-body-style */
/* eslint-disable ngrx/prefer-effect-callback-in-block-statement */
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, from, map, mergeMap, switchMap } from 'rxjs';
import { BoardService } from 'src/app/board/services/board.service';
import { Store } from '@ngrx/store';
import { ActionTypes } from '../actions/action-types';
import { selectUserId } from '../selectors/user.selectors';
import {
  DragTaskAction,
  HandleFixTasksOrderAction,
  TaskDataAction,
  TaskDeleteAction,
  TaskUpdateAction,
} from '../models/actions.model';
import { throwAppError } from '../actions/app-error.actions';
import {
  deleteTaskInStore,
  handleFixTaskOrder,
  storeAllColumnTasks,
  storeNewTask,
} from '../actions/task.actions';
import { OPERATIONS } from 'src/app/board/constants/operations';
import { selectTasksState } from '../selectors/tasks.selector';

@Injectable()
export class TaskEffects {
  postNewTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TaskDataAction>(ActionTypes.postNewTask),
      concatLatestFrom(() => [
        this.store.select(selectTasksState),
        this.store.select(selectUserId),
      ]),
      switchMap(([{ taskData }, tasks, userId]) => {
        const { columnId } = taskData;
        const newOrderedTask = { ...taskData, order: tasks[columnId].length };
        return this.boardService.createTask(newOrderedTask, userId).pipe(
          switchMap(async (fullTaskData) => storeNewTask({ fullTaskData })),
          catchError(async (err) => throwAppError({ err }))
        );
      })
    )
  );

  fetchTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.boardFetched),
      concatMap(({ columns, boardId }) => {
        return from(columns).pipe(
          concatMap(({ id }) => {
            return this.boardService.getAllTasks({ boardId, columnId: id }).pipe(
              switchMap(async (colTasks) => {
                return storeAllColumnTasks({ tasks: colTasks, columnId: id });
              })
            );
          })
        );
      })
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TaskDeleteAction>(ActionTypes.deleteTaskOnServer),
      mergeMap(({ boardId, columnId, taskId }) =>
        this.boardService.deleteTask(boardId, columnId, taskId).pipe(
          map(() => deleteTaskInStore({ taskId, columnId })),
          catchError(async (err) => throwAppError({ err }))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TaskUpdateAction>(ActionTypes.updateTaskOnServer),
      mergeMap(({ taskData }) =>
        this.boardService.updateTask(taskData).pipe(
          map((task) => ({ type: ActionTypes.updateTaskInStore, task })),
          catchError(async (err) => throwAppError({ err }))
        )
      )
    )
  );

  // updateTask$ = createEffect(() => {
  //   this.actions$.pipe(
  //     ofType<UpdateTaskAction>(ActionTypes.updateTaskData),
  //     switchMap(({ task }) => {
  //       const { boardId, columnId, userId, ...taskParams } = task;
  //       return this.boardService.updateTask(boardId, columnId, userId, taskParams).pipe(
  //         switchMap((data) => handleUpdateTaks({})),
  //         catchError(async (err) => throwAppError({ err }))
  //       );
  //     })
  //   );
  // });

  // handleDragTask$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType<DragTaskAction>(ActionTypes.dragTask),
  //     switchMap(({ task, fixableOrderTasks, operation, currentIndex }) => {
  //       const { userId, boardId, columnId, id, title, description } = task;

  //       const fixNumber = operation === OPERATIONS.DECREMENT ? 1 : -1;

  //       const newOrder = currentIndex + fixNumber;

  //       const tasks = [...fixableOrderTasks];

  //       const newTask = { id, title, description, order: newOrder };

  //       return this.boardService.updateTask(boardId, columnId, userId, newTask).pipe(
  //         map(() => handleFixTaskOrder({ boardId, tasks, operation, task: newTask })),
  //         catchError(async (err) => throwAppError({ err }))
  //       );
  //     })
  //   )
  // );

  // handleFixOrderColumn$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType<HandleFixTasksOrderAction>(ActionTypes.handleFixTasksOrder),
  //     map(({ boardId, tasks, operation, task }) => {
  //       const fixedTasks = operation === OPERATIONS.DECREMENT ? tasks : tasks.reverse();

  //       if (dragColumn) {
  //         fixedColumns.push(dragColumn);
  //       }

  //       return fixOrderHelper({ fixedColumns, operation, boardId });
  //     })
  //   )
  // );

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private store: Store
  ) {}
}
