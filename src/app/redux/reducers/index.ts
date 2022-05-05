import { ActionReducerMap } from '@ngrx/store';
import { userErrorReducer } from './user-error.reducer';
import { userReducer } from './user-data.reducer';
import { storageMetaReducer } from './user-data.metareducer';
import { MAStoreKeys } from '../constants/store-keys';

const reducers: ActionReducerMap<MAStore> = {
  [MAStoreKeys.user]: userReducer,
  [MAStoreKeys.error]: userErrorReducer,
};

const metaReducers = {
  metaReducers: [storageMetaReducer],
};

export { reducers, metaReducers };
