import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionControlWorkspaceRoutingModule } from './mission-control-workspaces-routing.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [CommonModule, MissionControlWorkspaceRoutingModule, ComponentsModule],
  exports: [ComponentsModule],
})
export class MissionControlWorkspacesModule {}
