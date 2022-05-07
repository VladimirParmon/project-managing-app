import { IBoard } from 'src/app/shared/models/board.model';

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
  boards: TBoards;
  user: StoreUser;
  userApiError: StoreError;
}

export type TBoards = IBoard[];
