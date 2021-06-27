import { AtLeast } from '@harman/utils';

interface INamePath {
  name: string;
  path: string;
  id: string;
}

export interface IWorkspace {
  id: string;
  path: string;
  name: string;
  creator: INamePath;
}

export class Workspace {
  static init(
    overrides: AtLeast<IWorkspace, 'name' | 'id' | 'path' | 'creator'>
  ): IWorkspace {
    return {
      ...overrides,
    };
  }
}
