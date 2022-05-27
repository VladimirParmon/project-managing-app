import { IBoard, IColumn, ITask } from 'src/app/shared/models/board.model';

export interface StoreUser {
  id?: string;
  name?: string;
  login?: string;
  token?: string;
}

export interface StoreError {
  code: number;
  message: string;
}

export interface MAStore {
  user: StoreUser;
  boards: TBoards;
  boardInfo: TColumns;
  tasks: TTasks;
  appError: StoreError;
  currentBoardTitle: string;
  isLoading: TLoading;
}

export type TBoards = IBoard[];

export type TColumns = IColumn[];

export type TTasks = {
  [columnId: string]: ITask[];
};

export type TLoading = boolean;
