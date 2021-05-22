import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@harman/mission-control/auth';
import { AppShellComponent } from '@harman/mission-control/shared';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@harman/mission-control/auth').then(
        (m) => m.MissionControlAuthModule
      ),
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    component: AppShellComponent,
    children: [
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
