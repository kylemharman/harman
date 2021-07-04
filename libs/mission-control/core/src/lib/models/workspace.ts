import { AtLeast, INamePath } from '@harman/utils';

export enum WorkspaceCollection {
  Users = 'users',
  Tasks = 'tasks',
}

export interface IWorkspace {
  id: string;
  path: string;
  name: string;
  creator: INamePath;
}

export class Workspace {
  static init(
    overrides: AtLeast<IWorkspace, 'id' | 'path' | 'creator'>
  ): IWorkspace {
    return {
      name: '',
      ...overrides,
    };
  }
}
