import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionControlWorkspaceRoutingModule } from './mission-control-workspaces-routing.module';
import { ComponentsModule } from './components/components.module';
import { CreateWorkspaceComponent } from './containers/create-workspace/create-workspace.component';

@NgModule({
  declarations: [CreateWorkspaceComponent],
  imports: [
    CommonModule,
    MissionControlWorkspaceRoutingModule,
    ComponentsModule,
  ],
  exports: [ComponentsModule],
})
export class MissionControlWorkspacesModule {}
