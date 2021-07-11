import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@harman/mission-control/auth';
import { AppShellComponent } from './components/app-shell/app-shell.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@harman/mission-control/auth').then(
        (m) => m.MissionControlAuthModule
      ),
  },
  {
    path: 'create-workspace',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('@harman/mission-control/workspaces').then(
        (m) => m.MissionControlWorkspacesModule
      ),
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: AppShellComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@harman/mission-control/dashboard').then(
            (m) => m.MissionControlDashboardModule
          ),
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('@harman/mission-control/tasks').then(
            (m) => m.MissionControlTasksModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionControlShellRoutingModule {}
