import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionControlWorkspaceRoutingModule } from './mission-control-workspaces-routing.module';
import { ComponentsModule } from './components/components.module';
import { CreateWorkspacePageComponent } from './containers/create-workspace-page/create-workspace-page.component';

@NgModule({
  declarations: [CreateWorkspacePageComponent],
  imports: [
    CommonModule,
    MissionControlWorkspaceRoutingModule,
    ComponentsModule,
  ],
  exports: [ComponentsModule],
})
export class MissionControlWorkspacesModule {}
