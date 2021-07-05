import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ThemeService } from './services/theme.service';
import { MissionControlShellRoutingModule } from './mission-control-shell-routing.module';

@NgModule({
  imports: [CommonModule, ComponentsModule, MissionControlShellRoutingModule],
  exports: [ComponentsModule],
  providers: [ThemeService],
})
export class MissionControlShellModule {}
