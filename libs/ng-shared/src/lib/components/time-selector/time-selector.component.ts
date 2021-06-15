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
import { getIntervals, ITimestamp, toMoment } from '@harman/utils';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'ha-time-selector',
  templateUrl: './time-selector.component.html',
  styleUrls: ['./time-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeSelectorComponent implements OnDestroy, OnInit {
  private _onDestroy$: Subject<void> = new Subject();
  @Input() timeInput: ITimestamp;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() interval: number = 15;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Output() timeChange = new EventEmitter<string>();

  // @ViewChild('timeInput', { read: MatAutocompleteTrigger })
  // timeInput: MatAutocompleteTrigger;

  timeControl: FormControl = new FormControl();
  timeInterval: string[];
  filteredOptions$: Observable<string[]>;

  constructor() {
    this.timeInterval = getIntervals(this.interval);
    this.filteredOptions$ = this.timeControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterTimes(value))
    );

    this.timeControl.valueChanges
      .pipe(takeUntil(this._onDestroy$))
      .subscribe((time) => this.timeChange.emit(time));
  }

  ngOnInit(): void {
    this.timeControl.setValue(this._getTime());
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  // closeTimeInput(): void {
  //   this.timeInput.closePanel();
  // }

  private _filterTimes(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.timeInterval.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _getTime(): string {
    if (!this.timeInput) return '';
    return toMoment(this.timeInput).format('h:mm a');
  }
}
