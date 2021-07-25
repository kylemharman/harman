import { Injectable } from '@angular/core';
import {
  IInvite,
  IMember,
  IUser,
  IWorkspace,
  RootCollection,
  WorkspaceCollection,
} from '@harman/mission-control/core';
import { FirestoreService } from '@harman/ng-shared';
import { snapshot } from '@harman/utils';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthFacade } from '../store/facades/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  // TODO - move these to a workspace store
  workspace$: Observable<IWorkspace>;
  member$: Observable<IMember>;

  constructor(private _db: FirestoreService, private _auth: AuthFacade) {
    this.workspace$ = this._auth.user$.pipe(
      switchMap((user) =>
        this._db.doc$<IWorkspace>(
          `${RootCollection.Workspaces}/${user.currentWorkspaceId}`
        )
      )
    );
    this.member$ = this._auth.user$.pipe(
      switchMap((user) =>
        this._db.doc$<IMember>(
          `${RootCollection.Workspaces}/${user.currentWorkspaceId}/${WorkspaceCollection.Members}/${user.id}`
        )
      )
    );
  }

  createWorkspace(workspaceName: string, createdBy: string): IWorkspace {
    const id = this._db.generateId();
    const docRef = this._db
      .col<IWorkspace>(RootCollection.Workspaces)
      .doc<IWorkspace>(id);

    return {
      name: workspaceName,
      id: docRef.ref.id,
      createdBy,
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
      path: `${RootCollection.Workspaces}/${user.currentWorkspaceId}/${WorkspaceCollection.Members}/${user.id}`,
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
    await this._db.set(
      `${RootCollection.Workspaces}/${workspaceID}/${WorkspaceCollection.Members}/${member.id}`,
      member
    );
  }

  async saveMemberInvite(email: string, role: string): Promise<void> {
    const workspace = await snapshot(this.workspace$);
    const member = await snapshot(this.member$);
    await this._db.add<IInvite>(
      `${RootCollection.Workspaces}/${workspace.id}/${WorkspaceCollection.Invites}`,
      {
        email,
        role,
        active: false,
        workspaceName: workspace.name,
        workspaceID: workspace.id,
      }
    );
  }
}
