import { createReducer, on } from '@ngrx/store';
import { IUser } from '../../../models/user';
import { AuthActions } from '../actions';

export const authFeatureKey = 'auth';
export interface AuthState {
  user: IUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: unknown;
}

export const initialAuthState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: true,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (_state, action) => ({
    user: action.user,
    isLoggedIn: true,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.updateProfileSuccess, (state, action) => ({
    ...state,
    user: action.user,
  })),
  on(AuthActions.loginFailed, (state, _action) => ({
    ...state,
    user: null,
    isLoading: false,
    isLoggedIn: false,
  })),
  on(AuthActions.authError, (state, action) => ({
    ...state,
    error: action.error,
  }))
);
