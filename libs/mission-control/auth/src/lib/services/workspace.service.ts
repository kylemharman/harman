import { Injectable } from '@angular/core';
import {
  IMember,
  IUser,
  IWorkspace,
  RootCollection,
  WorkspaceCollection,
} from '@harman/mission-control/core';
import { FirestoreService } from '@harman/ng-shared';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  constructor(private _db: FirestoreService) {}

  createWorkspace(workspaceName: string, user: IUser): IWorkspace {
    const id = this._db.generateId();
    const docRef = this._db
      .col<IWorkspace>(RootCollection.Workspaces)
      .doc<IWorkspace>(id);

    return {
      name: workspaceName,
      id: docRef.ref.id,
      createdBy: user.id,
    };
  }

  async saveWorkspace(workspace: IWorkspace): Promise<void> {
    await this._db.set(
      `${RootCollection.Workspaces}/${workspace.id}`,
      workspace
    );
  }

  createWorkspaceMember(
    workspaceName: string,
    user: IUser,
    isAdmin: boolean = false,
    isCreator: boolean = false
  ): IMember {
    return {
      id: user.id,
      user: `${RootCollection.Users}/${user.id}`,
      email: user.email,
      displayName: user.displayName,
      isAdmin,
      isCreator,
      workspaceName,
      profileImage: user.profileImage,
    };
  }

  async saveWorkspaceMember(
    workspaceID: string,
    member: IMember
  ): Promise<void> {
    console.log('workspaceID :>> ', workspaceID);
    console.log('member :>> ', member);
    await this._db.set(
      `${RootCollection.Workspaces}/${workspaceID}/${WorkspaceCollection.Members}/${member.id}`,
      member
    );
  }
}
