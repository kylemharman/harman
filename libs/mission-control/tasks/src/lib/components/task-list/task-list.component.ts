import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ITask } from '@harman/mission-control/core';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'mc-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  @Input() tasks: ITask[];
  @Output() taskOrderChanges = new EventEmitter<Update<ITask>[]>();
  @Output() taskChanges = new EventEmitter<Update<ITask>>();

  async drop(event: CdkDragDrop<ITask[]>): Promise<void> {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    this.taskOrderChanges.emit(this._sortTasks(this.tasks));
  }

  private _sortTasks(tasks: ITask[]): Update<ITask>[] {
    return tasks.map((task, index) => ({
      id: task.id,
      changes: { order: index },
    }));
  }
}
