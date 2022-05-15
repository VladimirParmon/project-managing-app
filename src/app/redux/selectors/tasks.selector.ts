import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAStoreKeys } from '../constants/store-keys';
import { TBoards, TTasks } from '../models/store.model';

export const selectTasksState = createFeatureSelector<TTasks>(MAStoreKeys.tasks);

export const selectTasks = createSelector(selectTasksState, (tasks) => tasks);
