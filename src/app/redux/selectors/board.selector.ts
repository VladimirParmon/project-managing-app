import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAStoreKeys } from '../constants/store-keys';
import { TColumns } from '../models/store.model';

export const selectBoardState = createFeatureSelector<TColumns>(MAStoreKeys.boardInfo);

export const selectColumns = createSelector(selectBoardState, (columns) => columns);
