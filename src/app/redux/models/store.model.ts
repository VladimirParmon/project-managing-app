import { IBoard, IColumn } from 'src/app/shared/models/board.model';

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
  boardInfo: TColumns;
  boards: TBoards;
  user: StoreUser;
  appError: StoreError;
}

export type TBoards = IBoard[];

export type TColumns = IColumn[];
