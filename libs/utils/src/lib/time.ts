import firebase from 'firebase';
import * as moment from 'moment';

export type ITimestamp = firebase.firestore.Timestamp;

export const Timestamp: typeof firebase.firestore.Timestamp =
  firebase.firestore.Timestamp;

export function toTimestamp(
  date?: ITimestamp | Date | moment.Moment
): ITimestamp {
  if (!date) {
    return Timestamp.now();
  }
  if (date instanceof Date) {
    return Timestamp.fromDate(date);
  }
  if (moment.isMoment(date)) {
    return Timestamp.fromDate(date.toDate());
  }
  return new Timestamp(date.seconds, date.nanoseconds);
}

export function toMoment(
  timestamp?: ITimestamp | moment.Moment | Date
): moment.Moment {
  const MS_TO_NANOS = 1000000;

  if (!timestamp) {
    return moment();
  }
  if (moment.isMoment(timestamp)) {
    return timestamp;
  }
  if (timestamp instanceof Date) {
    return moment(timestamp);
  }
  return moment(
    timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / MS_TO_NANOS)
  );
}

export function getIntervals(step: number): string[] {
  const intervalSlots = (Minutes.HOUR / step) * Hours.DAY;
  const start = moment().startOf('day');
  const intervals = [start.format('h:mm a')];

  for (let index = 1; index < intervalSlots; index++) {
    intervals.push(start.add(step, 'minutes').format('h:mm a'));
  }

  return intervals;
}

enum Minutes {
  HOUR = 60,
}

enum Hours {
  DAY = 24,
}
