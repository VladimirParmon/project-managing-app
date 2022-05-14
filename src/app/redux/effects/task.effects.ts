import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs';
import { ActionTypes } from '../actions/action-types';
import { BoardService } from 'src/app/board/services/board.service';
import { Store } from '@ngrx/store';
import { selectUserId } from '../selectors/user.selectors';
import { TaskDataAction } from '../models/actions.model';
import { throwAppError } from '../actions/app-error.actions';

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

  constructor(
    private actions$: Actions,
    private boardService: BoardService,
    private store: Store
  ) {}
}
