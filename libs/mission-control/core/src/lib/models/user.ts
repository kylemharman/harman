import { ITimestamp } from '@harman/utils';

export interface IUser {
  id: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  profileImage?: string;
  firstSignedInAt: ITimestamp;
  lastSignedInAt: ITimestamp;
  lastWorkspaceSignIn?: string;
  workspaces?: string[];
}
