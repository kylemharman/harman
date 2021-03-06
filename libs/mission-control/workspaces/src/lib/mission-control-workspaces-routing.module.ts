import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateWorkspacePageComponent } from './containers/create-workspace-page/create-workspace-page.component';

const routes: Routes = [
  {
    path: '',
    component: CreateWorkspacePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionControlWorkspaceRoutingModule {}
