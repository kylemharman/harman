import { Injectable } from '@angular/core';
import {
  IUser,
  IWorkspace,
  RootCollection,
  Workspace,
} from '@harman/mission-control/core';
import { FirestoreService } from '@harman/ng-shared';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private _db: FirestoreService) {}

  createWorkspace(user: IUser): IWorkspace {
    const id = this._db.generateId();
    const docRef = this._db
      .col<IWorkspace>(RootCollection.Workspaces)
      .doc<IWorkspace>(id);

    return Workspace.init({
      id: docRef.ref.id,
      path: docRef.ref.path,
      creator: {
        name: user.displayName,
        id: user.id,
        path: user.path,
      },
    });
  }

  async saveWorkspace(workspace: IWorkspace): Promise<void> {
    console.log('saveWorkspace');
    console.log('workspace saveWorkspace() :>> ', workspace);
    await this._db.set(workspace.path, workspace);
    console.log('after saveWorkspace');
  }
}
