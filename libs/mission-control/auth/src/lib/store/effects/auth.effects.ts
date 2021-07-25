import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filterUndefined } from '@harman/utils';
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
      concatMap(async ({ username, email, password }) => {
        const user = await this._authService.signUp(email, password);
        return { user, username };
      }),
      switchMap((credentials) => {
        const user = this._authService.createUser(
          credentials.user.user,
          credentials.username
        );
        console.log('user :>> ', user);
        return [
          AuthActions.setUser({ user }),
          AuthActions.saveUser({ user }),
          AuthActions.getWorkspaceInvites({ email: user.email }),
          // AuthActions.createWorkspaceNavigate(),
          // AuthActions.signUpCompleted(),
          // AuthActions.sendVerificationEmail({ user: credentials.user.user }),
        ];
      }),
      catchError((error) => of(AuthActions.signUpFailed({ error })))
    )
  );

  saveUser$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.saveUser),
        concatMap(({ user }) => this._authService.saveUser(user))
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.updateUser),
        concatMap(({ user }) => this._authService.updateUser(user))
      ),
    { dispatch: false }
  );

  getWorkspaceInvites$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.getWorkspaceInvites),
      switchMap(({ email }) =>
        this._authService.getUsersWorkspaceInvites$(email)
      ),
      map((invites) => {
        console.log({ invites });
        return invites.length
          ? AuthActions.setWorkspaceInvites({ invites })
          : AuthActions.createWorkspaceNavigate();
      })
    )
  );

  setInvites$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.setWorkspaceInvites),
        concatMap(() => this._router.navigateByUrl('invites'))
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
  // TODO create a workspace store/effects and move this
  setupWorkspace$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.setupWorkspace),
      concatMap(({ workspace, user }) => [
        AuthActions.saveWorkspace({ workspace, user }),
        AuthActions.saveWorkspaceCreator({ workspace, user }),
        AuthActions.loginSuccess({ user }),
      ])
    )
  );
  // TODO create a workspace store/effects and move this
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
  // TODO create a workspace store/effects and move this
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
    { dispatch: false }
  );

  sendVerificationEmail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.sendVerificationEmail),
      concatMap(({ user }) => this._authService.sendVerificationEmail(user)),
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
      concatMap(({ email, password }) =>
        this._authService.login(email, password)
      ),
      concatMap((user) => this._authService.getUser$(user.user.uid)),
      concatMap((user) => [
        AuthActions.setUser({ user }),
        AuthActions.loginSuccess({ user }),
      ]),
      catchError((error) => of(AuthActions.authError({ error })))
    )
  );

  loginSucess$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthActions.loginSuccess),
        concatMap(({ user }) =>
          this._router.navigate([user.currentWorkspaceId, 'dashboard'])
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
      concatMap(({ authProvider }) =>
        this._authService.authProviderLogin(authProvider)
      ),
      switchMap((credentials) => {
        if (credentials.additionalUserInfo.isNewUser) {
          const user = this._authService.createUser(credentials.user);
          return [
            AuthActions.setUser({ user }),
            AuthActions.saveUser({ user }),
            // Continue - if new user signs up check if there email is in any workspace invites, if so give them the option to accept the invite, if no invites are found direct them to the create workspace setup
            // before createWorkspaceNavigate() have another action
            AuthActions.createWorkspaceNavigate(),
          ];
        }
        return this._authService.getUser$(credentials.user.uid).pipe(
          take(1),
          concatMap((user) => [
            AuthActions.setUser({ user }),
            AuthActions.loginSuccess({ user }),
          ])
        );
      }),
      catchError((error) => of(AuthActions.authError({ error })))
    )
  );

  forgotPasswordRequested$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthActions.forgotPasswordRequested),
      concatMap(({ email }) => this._authService.forgotPassword(email)),
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
          return this._authService.getUser$(authUser.uid).pipe(
            filterUndefined(),
            concatMap((user) => [
              AuthActions.setUser({ user }),
              AuthActions.loginSuccess({ user }),
            ])
          );
        }
        // return [AuthActions.loginFailed()];
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
