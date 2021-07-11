import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWorkspaceComponent } from './containers/create-workspace/create-workspace.component';

const routes: Routes = [
  {
    path: '',
    component: CreateWorkspaceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionControlWorkspaceRoutingModule {}
