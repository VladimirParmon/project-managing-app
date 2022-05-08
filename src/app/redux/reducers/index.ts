import { ActionReducerMap } from '@ngrx/store';
import { userReducer } from './user-data.reducer';
import { storageMetaReducer } from './user-data.metareducer';
import { MAStoreKeys } from '../constants/store-keys';
import { MAStore } from '../models/store.model';
import { boardsReducer } from './boards.reducer';
import { appErrorReducer } from './app-error.reducer';

const reducers: ActionReducerMap<MAStore> = {
  [MAStoreKeys.user]: userReducer,
  [MAStoreKeys.boards]: boardsReducer,
  [MAStoreKeys.error]: appErrorReducer,
};

const metaReducers = {
  metaReducers: [storageMetaReducer],
};

export { reducers, metaReducers };
