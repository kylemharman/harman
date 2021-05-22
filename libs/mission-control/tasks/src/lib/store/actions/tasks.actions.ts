import { ITask } from '@harman/mission-control/core';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

export const loadAllTasksRequested = createAction(
  '[Tasks Resolver] Load All Tasks Requested'
);

export const loadAllTasksCompleted = createAction(
  '[Load Tasks Effect] Load All Tasks Completed',
  props<{ tasks: ITask[] }>()
);

export const taskUpdated = createAction(
  '[Task Enrty Dialog] Task Updated',
  props<{ update: Update<ITask> }>()
);

export const sortTasks = createAction(
  '[Tasks List] Sort Tasks',
  props<{ updates: Update<ITask>[] }>()
);

export const createTask = createAction(
  '[Create Task] Create Task',
  props<{ name: string }>()
);

export const taskCreated = createAction(
  '[Create Task] Task Created',
  props<{ task: ITask }>()
);

export const setSelectedTaskId = createAction(
  '[Task Resolver] Set Selected Task ID',
  props<{ id: string }>()
);

export const clearSelectTaskId = createAction(
  '[Task Dialog] Clear Selected Task ID'
);
