import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { WorkspaceService } from '../../services/workspace.service';
import { AuthActions } from '../actions';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.signUpRequested),
      concatMap((payload) =>
        this._authService
          .signUp$(payload.email, payload.password)
          .pipe(map((user) => ({ user, payload })))
      ),
      switchMap((credentials) => {
        const user = this._authService.createUser(
          credentials.user.user,
          credentials.payload.username
        );
        return [
          AuthActions.saveUser({ user }),
          AuthActions.loginSuccess({ user }),
          AuthActions.signUpCompleted(),
          AuthActions.sendVerificationEmail({ user: credentials.user.user }),
        ];
      }),
      catchError((error) => of(AuthActions.signUpFailed({ error })))
    )
  );

  saveUser$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.saveUser),
        concatMap(({ user }) => this._authService.saveUser(user)),
        catchError((error) => of(AuthActions.authError({ error })))
      ),
    { dispatch: false }
  );

  updateUserCurrentWorkspace$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.updateUserCurrentWorkspace),
        concatMap(({ user }) => this._authService.updateUser(user))
      ),
    { dispatch: false }
  );

  createWorkspaceNavigate$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.createWorkspaceNavigate),
        concatMap(() => this._router.navigateByUrl('create-workspace'))
      ),
    { dispatch: false }
  );

  setupWorkspace$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.setupWorkspace),
      concatMap(({ workspace, user }) => [
        AuthActions.saveWorkspace({ workspace, user }),
        AuthActions.saveWorkspaceCreator({ workspace, user }),
      ])
    )
  );

  saveWorkspace$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.saveWorkspace),
        concatMap(({ workspace }) =>
          this._workspaceService.saveWorkspace(workspace)
        )
      ),
    { dispatch: false }
  );

  saveWorkspaceCreator$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.saveWorkspaceCreator),
        concatMap(({ workspace, user }) => {
          const workspaceCreator = this._workspaceService.createWorkspaceMember(
            workspace.name,
            user,
            true,
            true
          );
          return this._workspaceService.saveWorkspaceMember(
            workspace.id,
            workspaceCreator
          );
        })
      ),
    // redirect user to new workspace
    { dispatch: false }
  );

  sendVerificationEmail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.sendVerificationEmail),
      concatMap((payload) =>
        this._authService.sendVerificationEmail$(payload.user)
      ),
      map(() => AuthActions.sendVerificationEmailSuccess()),
      catchError((error) => of(AuthActions.authError({ error })))
    )
  );

  sendVerificationEmailSucess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.sendVerificationEmailSuccess),
        concatMap(() => this._router.navigateByUrl('verify-email-address'))
      ),
    { dispatch: false }
  );

  loginRequested$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.loginRequested),
      concatMap((payload) =>
        this._authService.login$(payload.email, payload.password)
      ),
      concatMap((user) => this._authService.getUser$(user.user.uid)),
      map((user) => AuthActions.loginSuccess({ user })),
      catchError((error) => of(AuthActions.authError({ error })))
    )
  );

  loginSucess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.loginSuccess),
        concatMap((payload) =>
          this._router.navigate([payload.user.id, 'tasks'])
        )
      ),
    { dispatch: false }
  );

  loginFailed$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.loginFailed),
        concatMap(() => this._router.navigateByUrl('login'))
      ),
    { dispatch: false }
  );

  AuthProviderLogin$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.authProviderLogin),
      concatMap((payload) =>
        this._authService.authProviderLogin$(payload.authProvider)
      ),
      switchMap((credentials) => {
        if (credentials.additionalUserInfo.isNewUser) {
          const user = this._authService.createUser(credentials.user);
          return [
            AuthActions.saveUser({ user }),
            AuthActions.createWorkspaceNavigate(),
            // AuthActions.loginSuccess({ user }),
          ];
        }

        return (
          this._authService
            .getUser$(credentials.user.uid)
            // load user last used workspace.
            .pipe(map((user) => AuthActions.loginSuccess({ user })))
        );
      }),
      catchError((error) => of(AuthActions.authError({ error })))
    )
  );

  forgotPasswordRequested$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.forgotPasswordRequested),
      concatMap((payload) => this._authService.forgotPassword$(payload.email)),
      map(() => AuthActions.forgotPasswordComplete()),
      catchError((error) => of(AuthActions.authError({ error })))
    )
  );

  ForgotPasswordComplete$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.forgotPasswordComplete),
        tap(() =>
          this._snackBar.open('Password reset email sent, check your inbox.')
        )
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.logoutRequested),
      concatMap(() => this._authService.logout()),
      map(() => AuthActions.logoutCompleted()),
      catchError((error) => of(AuthActions.authError({ error })))
    )
  );

  logoutComplete$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.logoutCompleted),
        concatMap(() => this._router.navigateByUrl('login'))
      ),
    { dispatch: false }
  );

  getUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.getUser),
      concatMap(() => this._authService.getAuthState$()),
      take(1),
      switchMap((authUser) => {
        if (authUser) {
          return this._authService
            .getUser$(authUser.uid)
            .pipe(map((user) => AuthActions.loginSuccess({ user })));
        }
        return [AuthActions.loginFailed()];
      }),
      catchError((error) => of(AuthActions.authError({ error })))
    )
  );

  init$ = createEffect(() =>
    defer(() => {
      return of(AuthActions.getUser());
    })
  );

  constructor(
    private _actions$: Actions,
    private _authService: AuthService,
    private _workspaceService: WorkspaceService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}
}
