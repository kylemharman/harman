import * as moment from 'moment';

export interface IQuickDate {
  date: string;
  moment: moment.Moment;
  format: string;
}

export const quickDate: IQuickDate[] = [
  {
    date: 'Today',
    moment: moment(),
    format: 'ddd',
  },
  {
    date: 'Tomorrow',
    moment: moment().add(1, 'day'),
    format: 'ddd',
  },
  {
    date: 'This Weekend',
    moment: moment().startOf('isoWeek').add(5, 'days'),
    format: 'ddd',
  },
  {
    date: 'Next Week',
    moment: moment().startOf('isoWeek').add(1, 'week'),
    format: 'ddd',
  },
  {
    date: 'Next Weekend',
    moment: moment().startOf('isoWeek').add(5, 'days').add(1, 'week'),
    format: 'MMM D',
  },
  {
    date: '2 Weeks',
    moment: moment().add(2, 'weeks'),
    format: 'MMM D',
  },
  {
    date: '4 Weeks',
    moment: moment().add(4, 'weeks'),
    format: 'MMM D',
  },
  {
    date: '8 Weeks',
    moment: moment().add(8, 'weeks'),
    format: 'MMM D',
  },
];
