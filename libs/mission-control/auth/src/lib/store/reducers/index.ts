import { IUser } from '@harman/mission-control/core';
import { createReducer, on } from '@ngrx/store';
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
  on(AuthActions.setUser, (_state, { user }) => ({
    user,
    isLoggedIn: true,
    isLoading: false,
    error: null,
  })),
  on(AuthActions.updateUser, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.loginFailed, (state, _action) => ({
    ...state,
    user: null,
    isLoading: false,
    isLoggedIn: false,
  })),
  on(AuthActions.authError, (state, { error }) => ({
    ...state,
    error,
  }))
);
