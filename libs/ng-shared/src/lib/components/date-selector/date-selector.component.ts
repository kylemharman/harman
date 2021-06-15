import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import * as moment from 'moment';
import { ITimestamp, toMoment } from '@harman/utils';
import { IQuickDate, quickDate } from './date-selector';

@Component({
  selector: 'ha-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateSelectorComponent implements OnInit {
  @ViewChild(MatCalendar) calendar: MatCalendar<moment.Moment>;
  @Input() dateInput: ITimestamp;
  @Output() dateChange = new EventEmitter<moment.Moment>();
  date: moment.Moment | undefined;
  quickDates: IQuickDate[] = quickDate;

  ngOnInit(): void {
    this.date = this._getDateFromTimestamp();
  }

  quickDateClicked(moment: moment.Moment): void {
    this.date = moment;
    this.calendar._goToDateInView(this.date, 'month');
    this.dateChange.emit(this.date);
  }

  selectedDate(date: moment.Moment) {
    this.date = date;
    this.dateChange.emit(this.date);
  }

  private _getDateFromTimestamp(): moment.Moment | undefined {
    if (!this.dateInput) return undefined;

    const date = toMoment(this.dateInput);
    this.dateChange.emit(date);
    return date;
  }
}
