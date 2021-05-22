import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ITask } from '@harman/mission-control/core';
import { Update } from '@ngrx/entity';
import { TaskFacade } from '../../store/facades/task.facade';

@Component({
  selector: 'mc-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent {
  tasks$ = this._taskStore.tasks$;

  constructor(private _taskStore: TaskFacade) {}

  createTask(name: string): void {
    this._taskStore.createTask(name);
  }

  updateTask(task: Update<ITask>): void {
    this._taskStore.updateTask(task);
  }

  sortTasks(tasks: Update<ITask>[]): void {
    this._taskStore.sortTasks(tasks);
  }
}
