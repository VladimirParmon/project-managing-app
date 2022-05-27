import { ActionReducer } from '@ngrx/store';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LStorageKeys } from '../constants/store-keys';

export function titleMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  let onInit = true;

  return function processed(state, action) {
    const nextState = reducer(state, action);

    if (onInit) {
      onInit = false;
      const savedState = LocalStorageService.getSavedState(LStorageKeys.currentBoardTitle);
      return reducer({ ...state, currentBoardTitle: savedState }, action);
    }

    LocalStorageService.setSavedState(state.currentBoardTitle, LStorageKeys.currentBoardTitle);

    return nextState;
  };
}
