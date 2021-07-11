import { ITimestamp } from '@harman/utils';

export interface IUser {
  id: string;
  path: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  firstSignedInAt: ITimestamp;
  lastSignedInAt: ITimestamp;
  profileImage?: string;
  currentWorkspaceId?: string;
}
