import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { ThemeService } from './services/theme.service';
import { MissionControlShellRoutingModule } from './mission-control-shell-routing.module';
import { AppShellComponent } from './containers/app-shell/app-shell.component';

@NgModule({
  declarations: [AppShellComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    MissionControlShellRoutingModule,
    RouterModule,
  ],
  exports: [ComponentsModule],
  providers: [ThemeService],
})
export class MissionControlShellModule {}
