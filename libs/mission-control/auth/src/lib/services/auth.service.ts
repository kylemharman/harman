import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser, RootCollection } from '@harman/mission-control/core';
import { FirestoreService } from '@harman/ng-shared';
import { toTimestamp } from '@harman/utils';
import firebase from 'firebase';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  serverErrorMessage$ = new Subject<string>();
  firebaseAuthUser$ = this._afAuth.user;

  constructor(
    private _db: FirestoreService,
    private _afAuth: AngularFireAuth
  ) {}

  async signUp(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this._afAuth.createUserWithEmailAndPassword(email, password);
  }

  async login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this._afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout(): Promise<void> {
    await this._afAuth.signOut();
  }

  async authProviderLogin(
    authProvider: 'google' | 'facebook'
  ): Promise<firebase.auth.UserCredential> {
    const provider =
      authProvider === 'google'
        ? new firebase.auth.GoogleAuthProvider()
        : new firebase.auth.FacebookAuthProvider();

    return this._afAuth.signInWithPopup(provider);
  }

  getUser$(userUid: string): Observable<IUser | undefined> {
    return this._db.doc$<IUser>(`${RootCollection.Users}/${userUid}`);
  }

  getAuthState$(): Observable<firebase.User> {
    return this._afAuth.authState;
  }

  async sendVerificationEmail(user: firebase.User): Promise<void> {
    await user.sendEmailVerification();
  }

  async forgotPassword(email: string): Promise<void> {
    await this._afAuth.sendPasswordResetEmail(email);
  }

  async saveUser(user: IUser): Promise<void> {
    await this._db.set<IUser>(`${RootCollection.Users}/${user.id}`, user);
  }

  async updateUser(user: IUser): Promise<void> {
    await this._db.update<IUser>(`${RootCollection.Users}/${user.id}`, user);
  }

  createUser(firebaseUser: firebase.User, name?: string): IUser {
    return {
      id: firebaseUser.uid,
      path: `${RootCollection.Users}/${firebaseUser.uid}`,
      displayName: name ?? firebaseUser.displayName,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      profileImage: firebaseUser.photoURL,
      firstSignedInAt: toTimestamp(moment(firebaseUser.metadata.creationTime)),
      lastSignedInAt: toTimestamp(moment(firebaseUser.metadata.lastSignInTime)),
    };
  }
}
