import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAStoreKeys } from '../constants/store-keys';
import { StoreError, StoreUser } from '../models/store.model';

const selectUserFeature = createFeatureSelector<StoreUser>(MAStoreKeys.user);
const selectErrorFeature = createFeatureSelector<StoreError>(MAStoreKeys.error);

const selectUserAuthToken = createSelector(selectUserFeature, (user) => user.token);
const selectUserId = createSelector(selectUserFeature, (user) => user.id);

const selectAppErrorMessage = createSelector(selectErrorFeature, (error) => error.message);

export { selectAppErrorMessage, selectUserAuthToken, selectUserId };
