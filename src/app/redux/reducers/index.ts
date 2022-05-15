import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './user-data.reducer';
import { storageMetaReducer } from './user-data.metareducer';
import { MAStoreKeys } from '../constants/store-keys';
import { resetMetaReducer } from './user-data-reset.metareducer';
import { MAStore } from '../models/store.model';
import { boardsReducer } from './board.reducer';
import { appErrorReducer } from './app-error.reducer';
import { columnReducer } from './column.reducer';
import { loadingReducer } from './loading.reducer';

const reducers: ActionReducerMap<MAStore> = {
  [MAStoreKeys.isLoading]: loadingReducer,
  [MAStoreKeys.user]: userReducer,
  [MAStoreKeys.boardInfo]: columnReducer,
  [MAStoreKeys.boards]: boardsReducer,
  [MAStoreKeys.error]: appErrorReducer,
};

const metaReducers = {
  metaReducers: [storageMetaReducer, resetMetaReducer],
};

export { reducers, metaReducers };
