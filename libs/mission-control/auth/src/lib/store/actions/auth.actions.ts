import { IUser } from '@harman/mission-control/core';
import { createAction, props } from '@ngrx/store';
import firebase from 'firebase';

export const signUpRequested = createAction(
  '[Auth] Sign Up Requested',
  props<{ username: string; email: string; password: string }>()
);

export const signUpCompleted = createAction('[Auth] Sign Up Completed');

export const signUpFailed = createAction(
  '[Auth] Sign Up Failed',
  props<{ error: unknown }>()
);

export const sendVerificationEmail = createAction(
  '[Auth] Auth Send Verification Email',
  props<{ user: firebase.User }>()
);

export const sendVerificationEmailSuccess = createAction(
  '[Auth] Auth Send Verification Email Success'
);

export const updateProfile = createAction(
  '[Auth] Update Profile',
  props<{ displayName: string; profileImage: string }>()
);

export const updateProfileSuccess = createAction(
  '[Auth] Update Profile Success',
  props<{ user: IUser }>()
);

export const loginRequested = createAction(
  '[Auth] Login Requested',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: IUser }>()
);

export const loginFailed = createAction('[Auth] Login Failed');

export const authProviderLogin = createAction(
  '[Auth] Auth Provider Login',
  props<{ authProvider: 'google' | 'facebook' }>()
);

export const forgotPasswordRequested = createAction(
  '[Auth] Forgot Password Requested',
  props<{ email: string }>()
);

export const forgotPasswordComplete = createAction(
  '[Auth] Forgot Password Complete'
);

export const logoutRequested = createAction('[Auth] Logout Requested');
export const logoutCompleted = createAction('[Auth] Logout Completed');

export const saveUser = createAction(
  '[Auth] Save User',
  props<{ user: IUser }>()
);

export const getUser = createAction('[Auth] Get User');

export const authError = createAction(
  '[Auth] Error',
  props<{ error: unknown }>()
);
