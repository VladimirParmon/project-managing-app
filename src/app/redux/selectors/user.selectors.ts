import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAStoreKeys } from '../constants/store-keys';

const selectUserBlock = createFeatureSelector<StoreUser>(MAStoreKeys.user);
const selectUserErrorBlock = createFeatureSelector<StoreError>(MAStoreKeys.error);

const selectAuthErrorMessage = createSelector(selectUserErrorBlock, (error) => error.message);
const selectUserAuthToken = createSelector(selectUserBlock, (user) => user.token);
const selectUserId = createSelector(selectUserBlock, (user) => user.id);

export { selectAuthErrorMessage, selectUserAuthToken, selectUserId };
