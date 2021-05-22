import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ITimestamp } from '@harman/utils';
import * as moment from 'moment';

@Component({
  selector: 'mc-due-date-selector',
  templateUrl: './due-date-selector.component.html',
  styleUrls: ['./due-date-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DueDateSelectorComponent {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @Input() dueDate: ITimestamp;
  @Output() dueDateChange = new EventEmitter<moment.Moment>();
  date: moment.Moment | undefined;
  time: string | undefined;

  closeMenu(): void {
    const dueDate = this._createDueDate();
    if (dueDate) this.dueDateChange.emit(dueDate);

    this.trigger.closeMenu();
  }

  selectedDate(date: moment.Moment): void {
    this.date = date;
  }

  selectedTime(time: string): void {
    this.time = time;
  }

  clearDate(): void {
    this.date = undefined;
  }

  private _createDueDate(): moment.Moment {
    if (!this.date) return;

    const time = moment(this.time, 'h:mm a');
    const hour = time.hours();
    const min = time.minutes();
    const date = this.date.clone().startOf('day');
    return date.add(hour, 'hours').add(min, 'minutes');
  }
}
