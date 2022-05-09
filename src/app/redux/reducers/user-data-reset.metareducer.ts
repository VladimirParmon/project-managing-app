import { ActionReducer, INIT } from '@ngrx/store';
import { ActionTypes } from '../actions/action-types';

export function resetMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    if (action !== null && action.type === ActionTypes.logOutSubmit) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
}
