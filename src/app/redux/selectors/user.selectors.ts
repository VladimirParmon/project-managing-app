import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAStoreKeys } from '../constants/store-keys';

const selectUserFeature = createFeatureSelector<StoreUser>(MAStoreKeys.user);
const selectErrorFeature = createFeatureSelector<StoreError>(MAStoreKeys.error);

const selectUserAuthToken = createSelector(selectUserFeature, (user) => user.token);
const selectUserId = createSelector(selectUserFeature, (user) => user.id);
const selectUserName = createSelector(selectUserFeature, (user) => user.name);

const selectAppErrorMessage = createSelector(selectErrorFeature, (error) => error.message);

export { selectAppErrorMessage, selectUserAuthToken, selectUserId, selectUserName };
