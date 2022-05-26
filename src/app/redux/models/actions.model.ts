import { HttpErrorResponse } from '@angular/common/http';
import { UserSignUp, UserLogIn } from 'src/app/auth/models/auth.model';
import { OPERATIONS } from 'src/app/board/constants/operations';
import { ITask, ITaskCreate } from 'src/app/shared/models/board.model';
import { StoreUser } from './store.model';

export interface Action {
  type: string;
}

export interface SignUpAction extends Action {
  user: UserSignUp;
}

export interface LogInAction extends Action {
  user: UserLogIn;
}

export interface StoreUserDataAction extends Action {
  dataPart: StoreUser;
}

export interface ErrorAction extends Action {
  err: HttpErrorResponse;
}

export interface TaskDataAction extends Action {
  taskData: ITaskCreate;
}

export interface TaskDeleteAction extends Action {
  boardId: string;
  columnId: string;
  taskId: string;
}

export interface TaskUpdateAction extends Action {
  taskData: ITask;
}

export interface UpdateAction extends Action {
  user: UpdateUserDataType;
}

export interface UpdateUserDataType {
  name: string;
  login: string[];
  password: string;
  newPassword: string | undefined;
}

export interface UpdateTaskAction extends Action {
  task: ITask;
}

export interface DragTaskAction extends Action {
  task: ITask;
  fixableOrderTasks: ITask[];
  operation: OPERATIONS;
  currentIndex: number;
}

export interface HandleFixTasksOrderAction extends Action {
  boardId: string;
  tasks: ITask[];
  operation: string;
  task: ITask;
}

export interface SetNewColumnAction extends Action {
  id: string;
  order: number;
  title: string;
}
