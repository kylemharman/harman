import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const getUser = createSelector(selectAuthState, (auth) => auth.user);
export const invites = createSelector(selectAuthState, (auth) => auth.invites);

export const getIsLoggedIn = createSelector(
  selectAuthState,
  (auth) => auth.isLoggedIn
);

export const getIsLoading = createSelector(
  selectAuthState,
  (auth) => auth.isLoading
);

export const getError = createSelector(selectAuthState, (auth) => auth.error);
