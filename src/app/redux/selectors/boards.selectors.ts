import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAStoreKeys } from '../constants/store-keys';
import { TBoards } from '../models/store.model';

export const selectBoardsState = createFeatureSelector<TBoards>(MAStoreKeys.boards);

export const selectBoards = createSelector(selectBoardsState, (boards) => boards);
