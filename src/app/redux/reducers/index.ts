import { ActionReducerMap } from '@ngrx/store';
import { appErrorReducer } from './app-error.reducer';
import { userReducer } from './user-data.reducer';
import { storageMetaReducer } from './user-data.metareducer';
import { MAStoreKeys } from '../constants/store-keys';

const reducers: ActionReducerMap<MAStore> = {
  [MAStoreKeys.user]: userReducer,
  [MAStoreKeys.error]: appErrorReducer,
};

const metaReducers = {
  metaReducers: [storageMetaReducer],
};

export { reducers, metaReducers };
