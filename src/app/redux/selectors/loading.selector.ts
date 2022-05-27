import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MAStoreKeys } from '../constants/store-keys';
import { TLoading } from '../models/store.model';

export const selectLoading = createFeatureSelector<TLoading>(MAStoreKeys.isLoading);

export const selectIsLoading = createSelector(selectLoading, (loading) => loading);
