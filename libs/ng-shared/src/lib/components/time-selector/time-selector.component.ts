import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { getIntervals, ITimestamp, toMoment } from '../../helpers/time';

@Component({
  selector: 'mc-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeSelectorComponent implements OnDestroy, OnInit {
  private _onDestroy$: Subject<void> = new Subject();
  @Input() dueDate: ITimestamp;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() interval: number = 15;
  @Input() appearance: string = 'outline';
  @Output() timeChange = new EventEmitter<string>();

  @ViewChild('timeInput', { read: MatAutocompleteTrigger })
  timeInput: MatAutocompleteTrigger;

  time: FormControl = new FormControl();
  timeInterval: string[];
  filteredOptions$: Observable<string[]>;

  constructor() {
    this.timeInterval = getIntervals(this.interval);
    this.filteredOptions$ = this.time.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterTimes(value))
    );

    this.time.valueChanges
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((time) => this.timeChange.emit(time));
  }

  ngOnInit(): void {
    this.time.setValue(this._getTimeFromDueDate());
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  closeTimeInput(): void {
    this.timeInput.closePanel();
  }

  private _filterTimes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.timeInterval.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _getTimeFromDueDate(): string {
    if (!this.dueDate) return '';
    return toMoment(this.dueDate).format('h:mm a');
  }
}
