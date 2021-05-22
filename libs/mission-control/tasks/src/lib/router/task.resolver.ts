import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { TaskFacade } from '../store/facades/task.facade';

@Injectable()
export class TaskResolver implements Resolve<unknown> {
  constructor(private _taskStore: TaskFacade) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this._taskStore.setSelectedTaskId(route.paramMap.get('id'));
  }
}
