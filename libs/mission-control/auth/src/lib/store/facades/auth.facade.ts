import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import firebase from 'firebase';
import { AuthActions } from '../actions';
import { AuthState } from '../reducers';
import {
  getError,
  getIsLoading,
  getIsLoggedIn,
  getUser,
} from '../selectors/auth.selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  user$ = this._store.pipe(select(getUser));
  isLoggedIn$ = this._store.pipe(select(getIsLoggedIn));
  isLoading$ = this._store.pipe(select(getIsLoading));
  error$ = this._store.pipe(select(getError));

  constructor(private _store: Store<AuthState>) {}

  getUser(): void {
    this._store.dispatch(AuthActions.getUser());
  }

  login(email: string, password: string): void {
    this._store.dispatch(AuthActions.loginRequested({ email, password }));
  }

  authProviderLogin(authProvider: 'google' | 'facebook'): void {
    this._store.dispatch(AuthActions.authProviderLogin({ authProvider }));
  }

  signUp(username: string, email: string, password: string): void {
    this._store.dispatch(
      AuthActions.signUpRequested({ username, email, password })
    );
  }

  sendVerificationEmailMail(user: firebase.User) {
    this._store.dispatch(AuthActions.sendVerificationEmail({ user }));
  }

  forgotPassword(email: string) {
    this._store.dispatch(AuthActions.forgotPasswordRequested({ email }));
  }

  logout(): void {
    this._store.dispatch(AuthActions.logoutRequested());
  }
}
