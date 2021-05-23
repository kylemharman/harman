import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { ThemeService } from './services/theme.service';

@NgModule({
  imports: [CommonModule, ComponentsModule],
  exports: [ComponentsModule],
  providers: [],
})
export class MissionControlSharedModule {}
