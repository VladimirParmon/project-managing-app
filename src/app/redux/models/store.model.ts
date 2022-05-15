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
  user: StoreUser;
  boards: TBoards;
  boardInfo: TColumns;
  appError: StoreError;
  isLoading: TLoading;
}

export type TBoards = IBoard[];

export type TColumns = IColumn[];

export type TLoading = boolean;
