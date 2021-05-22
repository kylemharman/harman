import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, tap } from 'rxjs/operators';
import { TaskFacade } from '../store/facades/task.facade';
import { TasksState } from '../store/reducers';
import { allTasksLoadedCheck } from '../store/selectors/task.selectors';

@Injectable()
export class TasksResolver implements Resolve<unknown> {
  loading = false;

  constructor(
    private _taskStore: TaskFacade,
    private _store: Store<TasksState>
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._store.pipe(
      select(allTasksLoadedCheck),
      tap((tasksLoaded) => {
        if (!this.loading && !tasksLoaded) {
          this.loading = true;
          this._taskStore.loadAllTasks();
        }
      }),
      filter((tasksLoaded) => tasksLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
