import firebase from 'firebase';

export type DocumentReference = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;
export type CollectionReference = firebase.firestore.CollectionReference;

export interface INamePath {
  name: string;
  path: string;
  id: string;
}
