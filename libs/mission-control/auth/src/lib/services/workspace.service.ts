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
      creator: {
        name: user.displayName,
        id: user.id,
      },
    });
  }

  async saveWorkspace(workspace: IWorkspace): Promise<void> {
    await this._db.set(
      `${RootCollection.Workspaces}/${workspace.id}`,
      workspace
    );
  }
}
