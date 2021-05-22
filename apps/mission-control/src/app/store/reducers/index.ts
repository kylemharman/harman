import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { AuthActions } from '@harman/mission-control/auth';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};

export function clearState(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return (state, action) => {
    if (action != null && action.type === AuthActions.logoutCompleted.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [clearState]
  : [clearState];
