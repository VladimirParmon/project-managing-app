import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './user-data.reducer';
import { storageMetaReducer } from './user-data.metareducer';
import { MAStoreKeys } from '../constants/store-keys';
import { MAStore } from '../models/store.model';
import { boardsReducer } from './board.reducer';
import { appErrorReducer } from './app-error.reducer';
import { boardReducer } from './column.reducer';

const reducers: ActionReducerMap<MAStore> = {
  [MAStoreKeys.user]: userReducer,
  [MAStoreKeys.boardInfo]: boardReducer,
  [MAStoreKeys.boards]: boardsReducer,
  [MAStoreKeys.error]: appErrorReducer,
};

const metaReducers = {
  metaReducers: [storageMetaReducer],
};

export { reducers, metaReducers };
