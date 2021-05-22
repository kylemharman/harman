import { Injectable } from '@angular/core';
import { ITask } from '@harman/mission-control/core';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { TaskActions } from '../actions';
import { TasksState } from '../reducers';
import {
  selectAllTasks,
  selectTask,
  selectTotalTasks,
} from '../selectors/task.selectors';

@Injectable()
export class TaskFacade {
  tasks$ = this._store.pipe(select(selectAllTasks));
  task$ = this._store.pipe(select(selectTask));
  totalTasks$ = this._store.pipe(select(selectTotalTasks));

  constructor(private _store: Store<TasksState>) {}

  loadAllTasks(): void {
    this._store.dispatch(TaskActions.loadAllTasksRequested());
  }

  setSelectedTaskId(id: string): void {
    this._store.dispatch(TaskActions.setSelectedTaskId({ id }));
  }

  clearSelectedTask(): void {
    this._store.dispatch(TaskActions.clearSelectTaskId());
  }

  createTask(name: string): void {
    this._store.dispatch(TaskActions.createTask({ name }));
  }

  updateTask(update: Update<ITask>): void {
    this._store.dispatch(TaskActions.taskUpdated({ update }));
  }

  sortTasks(updates: Update<ITask>[]): void {
    this._store.dispatch(TaskActions.sortTasks({ updates }));
  }
}
