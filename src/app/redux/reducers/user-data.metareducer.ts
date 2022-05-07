import { ActionReducer } from '@ngrx/store';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { merge, pick } from 'lodash-es';
import { LStorageKeys, MAStoreKeys } from '../constants/store-keys';
import { StoreUser } from '../models/store.model';

export function storageMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  let onInit = true;

  return function processed(state, action) {
    const nextState = reducer(state, action);

    if (onInit) {
      onInit = false;
      const savedState = LocalStorageService.getSavedState(LStorageKeys.user);
      return merge(nextState, savedState);
    }

    const stateToSave = <StoreUser>pick(nextState, [MAStoreKeys.user]);
    LocalStorageService.setSavedState(stateToSave, LStorageKeys.user);

    return nextState;
  };
}
