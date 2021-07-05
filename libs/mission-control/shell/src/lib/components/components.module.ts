import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MissionControlSharedModule } from '@harman/mission-control/shared';

import { AppShellComponent } from './app-shell/app-shell.component';

@NgModule({
  imports: [CommonModule, RouterModule, MissionControlSharedModule],
  declarations: [AppShellComponent],
  exports: [AppShellComponent],
})
export class ComponentsModule {}
