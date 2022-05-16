import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, forkJoin, map, mergeMap, Observable } from 'rxjs';
import { ActionTypes } from '../actions/action-types';
import { BoardService } from 'src/app/board/services/board.service';
import { Store } from '@ngrx/store';
import { selectUserId } from '../selectors/user.selectors';
import { TaskDataAction, TaskDeleteAction } from '../models/actions.model';
import { throwAppError } from '../actions/app-error.actions';
import { TColumns, TTasks } from '../models/store.model';

@Injectable()
export class TaskEffects {
  postNewTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TaskDataAction>(ActionTypes.postNewTask),
      mergeMap(({ taskData }) =>
        this.boardService.getAllTasks(taskData).pipe(
          map((getAllTasksResult) => {
            const numberOfTasks = Object.keys(getAllTasksResult).length;
            const newData = { ...taskData };
            newData.order = numberOfTasks;
            return newData;
          }),
          concatLatestFrom(() => this.store.select(selectUserId)),
          mergeMap(([taskDataWithOrder, id]) => {
            return this.boardService.createTask(taskDataWithOrder, id);
          }),
          map((fullTaskData) => ({ type: ActionTypes.storeNewTask, fullTaskData })),
          catchError(async (err) => throwAppError({ err }))
        )
      )
    )
  );

  fetchTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.boardFetched),
      concatMap(({ columns, boardId }) => {
        const cols = columns as TColumns;

        let arr: Observable<TTasks>[] = [];
        for (let key in cols) {
          const columnId = cols[key].id;
          const query = this.boardService.getAllTasks({ boardId, columnId });
          arr.push(query);
        }
        return forkJoin(arr);
      }),
      map((arrayOfTaskArrays) => {
        /*
        before:

        0: [task1, task2],  <== tasks from column 1
        1: [task3, task4, task5] <== tasks from column 2

        ==>

        after:

        0: task1
        1: task2
        3: task3
        ...

        */
        let tasks: TTasks = [];
        arrayOfTaskArrays.forEach((singleArray) => (tasks = tasks.concat(singleArray)));
        return { type: ActionTypes.storeAllBoardTasks, tasks };
      })
    )
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType<TaskDeleteAction>(ActionTypes.deleteTaskOnServer),
      mergeMap(({ boardId, columnId, taskId }) =>
        this.boardService.deleteTask(boardId, columnId, taskId).pipe(
          map(() => ({ type: ActionTypes.deleteTaskInStore, taskId })),
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
