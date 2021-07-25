import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';
import { MissionControlDashboardRoutingModule } from './mission-control-dashboard-routing.module';
import { MissionControlWorkspacesModule } from '@harman/mission-control/workspaces';
@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    MissionControlDashboardRoutingModule,
    MissionControlWorkspacesModule,
  ],
  exports: [ComponentsModule],
  declarations: [DashboardPageComponent],
})
export class MissionControlDashboardModule {}
