import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAStoreKeys } from '../constants/store-keys';

export const selectCurrentOpenedBoardTitleState = createFeatureSelector<string>(
  MAStoreKeys.currentBoardTitle
);

export const selectCurrentOpenedBoardTitle = createSelector(
  selectCurrentOpenedBoardTitleState,
  (title) => title
);
