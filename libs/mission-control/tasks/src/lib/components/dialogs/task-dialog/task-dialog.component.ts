import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITask, TaskPriority } from '@harman/mission-control/core';
import { isEqual } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { TaskFacade } from '../../../store/facades/task.facade';

@Component({
  selector: 'mc-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDialogComponent implements OnDestroy {
  private _onDestroy$: Subject<void> = new Subject();
  task: ITask;

  constructor(
    private _taskStore: TaskFacade,
    private _dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask
  ) {
    this.task = { ...this.data };
    this._dialogRef
      .backdropClick()
      .pipe(
        tap(() => this.close()),
        takeUntil(this._onDestroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  setPriority(priority: TaskPriority): void {
    this.task.priority = priority;
  }

  close(): void {
    const update = !isEqual(this.task, this.data) ? this.task : undefined;
    this._dialogRef.close(update);
    this._taskStore.clearSelectedTask();
  }
}
