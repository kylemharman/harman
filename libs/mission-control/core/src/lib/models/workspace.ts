import { AtLeast, INamePath } from '@harman/utils';

export enum WorkspaceCollection {
  members = 'members',
  Tasks = 'tasks',
  Config = 'config',
}

export interface IWorkspace {
  id: string;
  name: string;
  creator: { name: string; id: string };
}

export class Workspace {
  static init(overrides: AtLeast<IWorkspace, 'id' | 'creator'>): IWorkspace {
    return {
      name: '',
      ...overrides,
    };
  }
}
