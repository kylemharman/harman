import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists,
} from '@angular/fire/firestore';
import firebase from 'firebase';
import { isString } from 'lodash';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
export type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private _afs: AngularFirestore) {}

  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return isString(ref) ? this._afs.collection<T>(ref, queryFn) : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return isString(ref) ? this._afs.doc<T>(ref) : ref;
  }

  /// **************
  /// Get Data
  /// **************

  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref)
      .snapshotChanges()
      .pipe(
        map(
          (
            doc: Action<
              DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>
            >
          ) => {
            return doc.payload.data() as T;
          }
        )
      );
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((docs: DocumentChangeAction<T>[]) => {
          return docs.map((a: DocumentChangeAction<T>) =>
            a.payload.doc.data()
          ) as T[];
        })
      );
  }

  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<unknown[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<T>[]) => {
          return actions.map((a: DocumentChangeAction<T>) => {
            // eslint-disable-next-line @typescript-eslint/ban-types
            const data: Object = a.payload.doc.data() as T;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  /// **************
  /// Write Data
  /// **************

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  set<T>(ref: DocPredicate<T>, data: T): Promise<void> {
    const timestamp = this.timestamp;
    const doc = this.doc(ref);
    return doc.set(
      {
        ...data,
        updatedAt: timestamp,
        createdAt: timestamp,
        id: doc.ref.id,
        path: doc.ref.path,
      },
      { merge: true }
    );
  }

  update<T>(ref: DocPredicate<T>, data: T): Promise<void> {
    return this.doc(ref).update({
      ...data,
      updatedAt: this.timestamp,
    });
  }

  delete<T>(ref: DocPredicate<T>): Promise<void> {
    return this.doc(ref).delete();
  }

  async add<T>(
    ref: CollectionPredicate<T>,
    data: T
  ): Promise<AngularFirestoreDocument<T>> {
    const timestamp = this.timestamp;
    const doc = this.col(ref).doc<T>(this._afs.createId());
    await doc.set({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp,
      id: doc.ref.id,
      path: doc.ref.path,
    });
    return doc;
  }

  upsert<T>(ref: DocPredicate<T>, data: T): Promise<void> {
    const doc = this.doc(ref).snapshotChanges().pipe(take(1)).toPromise();

    return doc.then(
      (
        snap: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>
      ) => {
        return snap.payload.exists
          ? this.update(ref, data)
          : this.set(ref, data);
      }
    );
  }

  generateId(): string {
    return this._afs.createId();
  }
}
