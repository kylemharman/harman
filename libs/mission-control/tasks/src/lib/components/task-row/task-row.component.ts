import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ITask, TaskPriority } from '@harman/mission-control/core';
import { toTimestamp } from '@harman/utils';
import { Update } from '@ngrx/entity';
import * as moment from 'moment';

@Component({
  selector: 'mc-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskRowComponent {
  @Input() task: ITask;
  @Output() taskChanges = new EventEmitter<Update<ITask>>();

  updatePriority(priority: TaskPriority): void {
    if (this.task.priority !== priority) {
      this.taskChanges.emit({
        id: this.task.id,
        changes: { priority },
      });
    }
  }

  updateDueDate(dueDate: moment.Moment): void {
    this.taskChanges.emit({
      id: this.task.id,
      changes: { dueDate: toTimestamp(dueDate) },
    });
  }
}
