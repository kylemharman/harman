import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskEntryDialogComponent } from './components/dialogs/task-entry-dialog/task-entry-dialog.component';
import { TasksComponent } from './containers/tasks/tasks.component';
import { TaskResolver } from './router/task.resolver';
import { TasksResolver } from './router/tasks.resolver';

const routes: Routes = [
  {
    path: '',
    component: TasksComponent,
    resolve: {
      tasks: TasksResolver,
    },
    children: [
      {
        path: ':id',
        component: TaskEntryDialogComponent,
        resolve: {
          task: TaskResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionControlTasksRoutingModule {}
