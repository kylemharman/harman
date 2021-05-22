import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTasks from '../reducers';

export const selectTasksState = createFeatureSelector<fromTasks.TasksState>(
  fromTasks.tasksFeatureKey
);

export const selectAllTasks = createSelector(
  selectTasksState,
  fromTasks.getAllTasks
);

export const selectTotalTasks = createSelector(
  selectTasksState,
  fromTasks.getTotalTasks
);

// get all the tasks
export const selectTaskEntities = createSelector(
  selectTasksState,
  fromTasks.getTaskEntities
);

// get the selected taskID off of the state
export const selectTaskId = createSelector(
  selectTasksState,
  (state) => state.selectedTaskId
);

// use the two above to get a selected task
export const selectTask = createSelector(
  selectTaskEntities,
  selectTaskId,
  (taskEntities, id) => (id ? taskEntities[id] : undefined)
);

// check to see if task are already loaded in store
export const allTasksLoadedCheck = createSelector(
  selectTasksState,
  (state) => state.loaded
);
