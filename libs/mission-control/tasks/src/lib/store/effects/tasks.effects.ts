import { Injectable } from '@angular/core';
import { ITask } from '@harman/mission-control/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import { TasksService } from '../../services/tasks.service';
import { TaskActions } from '../actions';

@Injectable()
export class TasksEffects {
  loadTasks$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.loadAllTasksRequested),
      concatMap(() => this._taskService.getAllTasks$()),
      map((tasks) => TaskActions.loadAllTasksCompleted({ tasks }))
    )
  );

  updateTask$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(TaskActions.taskUpdated),
        concatMap((action) =>
          this._taskService.updateTask(
            action.update.id as string,
            action.update.changes
          )
        )
      ),
    { dispatch: false }
  );

  createTask$ = createEffect(() =>
    this._actions$.pipe(
      ofType(TaskActions.createTask),
      concatMap((action) => this._taskService.createTask(action.name)),
      map((task) => TaskActions.taskCreated({ task }))
    )
  );

  taskCreated$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(TaskActions.taskCreated),
        concatMap((action) => this._taskService.saveTask(action.task))
      ),
    { dispatch: false }
  );

  sortTask$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(TaskActions.sortTasks),
        concatMap((action) => {
          const tasks = action.updates.map(
            (task) =>
              ({
                order: task.changes,
                id: task.id,
              } as Partial<ITask>)
          );
          return this._taskService.sortTasks(tasks);
        })
      ),
    { dispatch: false }
  );

  constructor(private _actions$: Actions, private _taskService: TasksService) {}
}
