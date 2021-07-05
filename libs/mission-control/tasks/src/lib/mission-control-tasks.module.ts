import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from '@harman/ng-material';
import { NgSharedModule } from '@harman/ng-shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TooltipModule } from 'ng2-tooltip-directive';
import { MomentModule } from 'ngx-moment';

import { CreateTaskComponent } from './components/create-task/create-task.component';
import { TaskDialogComponent } from './components/dialogs/task-dialog/task-dialog.component';
import { TaskEntryDialogComponent } from './components/dialogs/task-entry-dialog/task-entry-dialog.component';
import { DueDateSelectorComponent } from './components/menus/due-date-selector/due-date-selector.component';
import { PrioritySelectorComponent } from './components/menus/priority-selector/priority-selector.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskRowComponent } from './components/task-row/task-row.component';
import { TasksComponent } from './containers/tasks/tasks.component';
import { MissionControlTasksRoutingModule } from './mission-control-tasks-routing.module';
import { TaskResolver } from './router/task.resolver';
import { TasksResolver } from './router/tasks.resolver';
import { TasksService } from './services/tasks.service';
import { TasksEffects } from './store/effects/tasks.effects';
import { TaskFacade } from './store/facades/task.facade';
import * as fromTasks from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    MissionControlTasksRoutingModule,
    FormsModule,
    DragDropModule,
    NgSharedModule,
    NgMaterialModule,
    MomentModule,
    TooltipModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromTasks.tasksFeatureKey, fromTasks.tasksReducers),
    EffectsModule.forFeature([TasksEffects]),
  ],
  declarations: [
    TasksComponent,
    CreateTaskComponent,
    TaskListComponent,
    TaskRowComponent,
    TaskDialogComponent,
    TaskEntryDialogComponent,
    DueDateSelectorComponent,
    PrioritySelectorComponent,
  ],
  providers: [TasksService, TaskFacade, TaskResolver, TasksResolver],
})
export class MissionControlTasksModule {}
