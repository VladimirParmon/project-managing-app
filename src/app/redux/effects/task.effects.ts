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
  SetNewColumnAction,
  TaskDataAction,
  TaskDeleteAction,
  TaskUpdateAction,
} from '../models/actions.model';
import { throwAppError } from '../actions/app-error.actions';
import { deleteTaskInStore, storeAllColumnTasks, storeNewTask } from '../actions/task.actions';
import { selectTasksState } from '../selectors/tasks.selector';

@Injectable()
export class TaskEffects {
  setNewColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SetNewColumnAction>(ActionTypes.setNewColumn),
      switchMap(async ({ id }) => {
        return storeAllColumnTasks({ tasks: [], columnId: id });
      })
    )
  );

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

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private store: Store
  ) {}
}
