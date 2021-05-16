import { ITimestamp } from 'src/app/shared/helpers/time';

export interface IUser {
  id: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  profileImage?: string;
  firstSignedInAt: ITimestamp;
  lastSignedInAt: ITimestamp;
  isOnline: boolean;
}

export enum UserCollection {
  Tasks = 'tasks',
}
