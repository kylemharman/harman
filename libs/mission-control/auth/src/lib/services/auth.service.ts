import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import * as moment from 'moment';
import { from, Observable, Subject } from 'rxjs';
import { toTimestamp } from '@harman/utils';
import { FirestoreService } from '@harman/ng-shared';
import { IUser, RootCollection } from '@harman/mission-control/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  serverErrorMessage$ = new Subject<string>();
  firebaseAuthUser$ = this._afAuth.user;

  constructor(
    private _db: FirestoreService,
    private _afAuth: AngularFireAuth
  ) {}

  signUp$(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    return from(this._afAuth.createUserWithEmailAndPassword(email, password));
  }

  login$(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    return from(this._afAuth.signInWithEmailAndPassword(email, password));
  }

  logout(): Promise<void> {
    return this._afAuth.signOut();
  }

  authProviderLogin$(
    authProvider: 'google' | 'facebook'
  ): Observable<firebase.auth.UserCredential> {
    const provider =
      authProvider === 'google'
        ? new firebase.auth.GoogleAuthProvider()
        : new firebase.auth.FacebookAuthProvider();

    return from(this._afAuth.signInWithPopup(provider));
  }

  getUser$(userUid: string): Observable<IUser | undefined> {
    return this._db.doc$<IUser>(`${RootCollection.Users}/${userUid}`);
  }

  getAuthState$(): Observable<firebase.User> {
    return this._afAuth.authState;
  }

  sendVerificationEmail$(user: firebase.User): Observable<unknown> {
    return from(user.sendEmailVerification());
  }

  forgotPassword$(email: string): Observable<void> {
    return from(this._afAuth.sendPasswordResetEmail(email));
  }

  async saveUser(user: IUser): Promise<void> {
    await this._db.set<IUser>(`${RootCollection.Users}/${user.id}`, user);
  }

  createUser(firebaseUser: firebase.User, name?: string): IUser {
    return {
      id: firebaseUser.uid,
      displayName: name ?? firebaseUser.displayName,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      profileImage: firebaseUser.photoURL,
      firstSignedInAt: toTimestamp(moment(firebaseUser.metadata.creationTime)),
      lastSignedInAt: toTimestamp(moment(firebaseUser.metadata.lastSignInTime)),
      isOnline: true,
    };
  }
}
