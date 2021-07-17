export enum WorkspaceCollection {
  Members = 'members',
  Tasks = 'tasks',
  Config = 'config',
}

export interface IWorkspace {
  id: string;
  name: string;
  createdBy: string;
}

export interface IMember {
  id: string;
  path: string;
  user: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  isCreator: boolean;
  workspaceName: string;
  profileImage?: string;
}
