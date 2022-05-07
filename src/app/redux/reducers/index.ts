import { ActionReducerMap } from '@ngrx/store';
import { userErrorReducer } from './user-error.reducer';
import { userReducer } from './user-data.reducer';
import { storageMetaReducer } from './user-data.metareducer';
import { MAStoreKeys } from '../constants/store-keys';
import { MAStore } from '../models/store.model';
import { boardsReducer } from './boards.reducer';

const reducers: ActionReducerMap<MAStore> = {
  [MAStoreKeys.user]: userReducer,
  [MAStoreKeys.error]: userErrorReducer,
  [MAStoreKeys.boards]: boardsReducer,
};

const metaReducers = {
  metaReducers: [storageMetaReducer],
};

export { reducers, metaReducers };
